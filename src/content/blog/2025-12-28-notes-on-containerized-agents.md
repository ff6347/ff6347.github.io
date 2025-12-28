---
title: "Notes on Containerized Agents"
pubDate: 2025-12-28
tags:
  - agents
  - llm
  - container
  - git
  - worktrees
  - docker
categories:
  - tech
published: true
description: "Some notes and links on containerized coding agents - bonus: my docker sandbox recipe"
---
I have to put my money where my mouth is. Since I've been ranting about MCP and security in the post about ["MCP in experimentation or how I trust the trust of others"](https://fabianmoronzirfas.me/blog/2025-10-31-mcp-security/). Having a docker container where I run the MCP tool in was not as straight forward as I thought. It worked somehow but also became annoying to maintain volumes in that one string to make this feasible. I dropped that and went on with my live. 

But then I have been dabbling with agents in containers recently and here are some nice things I found. 

- Conductor [conductor.build](https://www.conductor.build/) A pretty nice application that uses [git-worktrees](https://git-scm.com/docs/git-worktree) on your local machine to run agents in your repos.
-  git-worktrees in general make a good tool for having a second checked out version of your repo. `git worktree add ../my-feautre main`
- in [Docker](https://www.docker.com/) 4.5 they introduced [`sandbox` command](https://docs.docker.com/ai/sandboxes/advanced-config/) It runs a container for you with the current working directory mounted into the container. In the container [`claude`](https://claude.ai) is already installed as binary. Very nice. You can even specify your own image templates. `claude` runs here with `--dangerously-skip-permissions` I would recommend a combination of, commit before running or better use git-worktrees with it.
- Just yesterday I stumbled upon [sketch.dev](https://sketch.dev/welcome) via HN That gives you fully isolated docker containers locally, remote and also with a hosted platform. The UI still seems a little beta but kinda nice.
- They (the people from sketch.dev) also have a service called [exe.dev](https://exe.dev) Here you get a VM in the clouds to run your agent in. With lots of great DX.
- One last thing to sandbox an agent differently is giving it access to a Raspberry Pi. I have Pi5 with 8GB and a nvm base attached to it hocked into my local network. On the Pi I have tailscale running with `tailscale up --ssh` and some tags in my ACL to allow access from a ephemeral machine. Then I just pass claude the temporary token and tell him to ssh into the pi and go havoc in there. :D. (I noticed that `claude` likes it more to run command from the host on the Pi rather then logging in and having a session in there, but hey — however you think you are absolutely right `claude`)


## Docker Sandbox Recipes


Run Go dev env for `claude`:

```Dockerfile
# ABOUTME: Development container for docker sandbox, adds Go toolchain for Pi development
# ABOUTME: Extends official claude code sandbox template with Go and dev tools

FROM docker/sandbox-templates:claude-code

# Create sandbox lock directory
RUN mkdir -p /home/agent/.docker/sandbox/locks

# Install Go and dev tools
RUN &#x3C;&#x3C;EOF
sudo apt-get update && sudo apt-get install -y \
	golang-go \
	fish \
	magic-wormhole \
	tmux \
	vim \
	bat \
	lsd \
	zoxide \
	&& sudo rm -rf /var/lib/apt/lists/*
EOF

ENV GOPATH=/home/agent/go
ENV PATH=$PATH:/home/agent/go/bin

```

Build the image
```bash
docker build my-template .
```

Use the sandbox with some local `~/.claude` folders mounted as read only so the agent behaves more like my local agent. You still will have to login within the container with your credentials or provide a API key.

```bash
# Run claude in sandbox with this project
docker sandbox run -t my-template -w . \
  -v ~/.claude/CLAUDE.md:/home/agent/.claude/CLAUDE.md:ro \
  -v ~/.claude/plugins:/home/agent/.claude/plugins:ro \
  -v ~/.claude/commands:/home/agent/.claude/commands:ro \
  claude
# Continue previous session
docker sandbox run -t creatureone-dev -w . claude -c
```


If you do changes to the template you need to remove it first.
```bash
# If you rebuild the image, remove the old sandbox first
docker sandbox ls
docker sandbox rm <sandbox-id>
```
