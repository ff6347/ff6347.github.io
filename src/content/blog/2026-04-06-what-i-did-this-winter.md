---
title: "What I did this Winter"
pubDate: 2026-04-06
tags: ["projects", "master", "speculative", "software", "slm", "lupus"]
categories: ["master", "lupus", "speculative", "work"]
published: true
description: "A summary of what happend and why it gotten so silent around here. Bonanza, Flarelines, Colony"
---


It's gotten pretty silent around here. My semester was over and I had to take a break and let the things I read and created sink in a little. This doesn't mean that I was sitting on my hands, but I needed a little output break. So most of Februar was a lot of Kung Fu, fiddling around the house, doing stuff with the kids. Most of March, I've been working on a job for the university. [github.com/bonanzahq/bonanza](https://github.com/bonanzahq/bonanza) *[Music playing in your head, some cowboys riding towards a farm]*

**Bonanza** is a project that was first conceived around 2013/2014 when I was the lab supervisor of the interface workshop at FHP. It is the lending system that has been in use in the workshops since then. This application was so much EOL, its Ruby version, its Rails version and the OS version of the server was running on, the FHP asked me if I could bring it back into this decade. First, I was pretty cautious because I don't read and write Ruby, I don't know anything about Rails. But I still like a challenge.

So I took the job. 

Lucky me, Opus 4.6 landed before I had to work on it. Over the last few weeks I worked often on this project, fully assisted by Opus. I revived the project and developed a nice process to work on larger endeavors like these.

My process can be described as the following. 

Several agents, running on a Mac Mini M1 sitting on my desk connected to my local network and my Tailscale VPN. Me logging in via SSH from my laptop or Terminus from mobile devices. All sessions are persistent tmux sessions. (Learned quite a bit to use tmux) There's always one main session I call the project manager which only handles creating git worktrees, writing handoff.md into them and spawning agents in new tmux windows. These agents use an agent messaging skill to report back to the project manager and synchronize with other agents for access to the Docker stack. All development is test driven development. Since the agents are running on a desktop computer, they can use browsers to validate the features they wrote using end to end testing. 
I developed some nice agent skills on the way to the v2. We are still in implicit Copyright mode but will add a open source license soon. 

On other news I released two projects. They are still work in progress but in a state where I can start talking about them. 

- First one is Flarelines. See it at [flarelines.cc](https://flarelines.cc/). Read more about it in [this blog post](/blog/2026-04-06-flarelines).
- Second project from last semesters Studio Seminar is Colony [c010ny.cc](https://c010ny.cc/). You can read more about it over in [that blog post](/blog/2026-04-06-colony).
