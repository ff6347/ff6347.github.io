---
title: "MCP in experimentation or how I trust the trust of others"
pubDate: 2025-10-31
tags: [security,teaching,mcp,ai]
categories: [security]
published: true
description: "In this guide I try to explain the security risks of running MCP servers with Node.js and npm. I propose an alternative using Docker containers to sandbox these services and protect your computer from potential supply chain attacks."
---

## Contents

In the last few days, I saw some of my professors advise my fellow students to experiment with the Model Context Protocol (MCP) for large language models (LLM). This is awesome. I really want us to learn about the inner workings of large language models, and what we can do with it. Let's get to the BUT for this blog post, since without a but there would be no need for this text.

## The Security Risks at Hand

### Problems With NPM

Node.js (I'll explain what this is later on) and JavaScript (JS) are tightly coupled to the [Node Package Manager (NPM)](https://www.npmjs.com/) ecosystem. This is a vaste registry of packages of ready made JavaScript modules. These modules serve different porpuses. There is a module for everything, so we don't have to reinvent the wheel every time we create a new project. It is easy to use, easy to add and saves us a ton of time. By adding some module we create a dependency. These other developers also don't want to reinvent the wheel, and so they also add dependencies to their packages. You might get the idea. We create a deeply nested tree of dependencies and transitive dependencies[^transitive].

**This means: When I add some code to my project as a dependency, I also have to trust that the author of this code trusts the authors of the dependencies he added, and they trust the other authors and so on.**

The current state of the NPM ecosystem is problematic. In the last few months, we saw elaborate supply chain attacks against the registry and prominent packages that have millions of downloads. If you are interested in what happened, read [Shai-Hulud npm supply chain attack - new compromised packages detected](https://jfrog.com/blog/shai-hulud-npm-supply-chain-attack-new-compromised-packages-detected/)[^shaihulud] or [PhantomRaven: NPM Malware Hidden in Invisible Dependencies | Koi Blog](https://www.koi.ai/blog/phantomraven-npm-malware-hidden-in-invisible-dependencies). I won't go into the details of these, because this is too technical and others can explain this better than I can.


### The Combination of Service

Often, one MCP is harmless, only the combination of several MCPs create
an attack vector. If you, for example, restrict the LLM from accessing the internet and only feed it trusted context, that you yourself reviewed or created, the instructions you generally get are fine. As soon as you add untrusted context into the mix, we get something [Simon Willison coined "The Lethal Trifecta"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/). He states that these three components:

1. Access to you private data
2. The ability to externally communicate
3. Exposure to untrusted content

Create a big security risk. I urge you to read his blog, it is a great resource for understanding LLMs.

## How Not to Do It

When using the widely propagated method of installing a MCP service, we normally get an instruction to:

* install Claude Desktop or ChatGPT Desktop
* and Node.js.
* Together with the instruction to add the below JavaScript Object Notation (JSON) somewhere in the settings of one of these desktop apps.

```json
{
	"mcpServers": {
		"filesystem": {
			"command": "npx",
			"args": [
			"-y",
    	"@modelcontextprotocol/server-filesystem",
    	"/Users/username/Desktop",
    	"/Users/username/Downloads"
			]
		}
	}
}
```


This seems easy. Let us examine what we are adding here. The desktop applications are not the problem. But we also install [Node.js](https://nodejs.org/en). This is a program that can execute JS code on your computer. Don't get me wrong. I love Node and I have been programming with it for more than a decade. It is a great tool. The great thing and the problem is that it can do anything. It was created around 2009. The original author of Node.js, Ryan Dahl, started years later another project called Deno, with the intention to fix the problems he introduced with Node.js. But this is not a rant about Node or a history lesson.

Back to the problem. When we run code with Node.js, it has same rights that you have on your computer without entering your password. It can read and also write files, make web requests, and so on. It could extract information about you that can range from your email, to which programs you use, and even install arbitrary code that gets executed when you do something.


Back to our little innocent JSON snippet we added to our LLMs settings:

```json
"command": "npx"
```

Together with `node` we install a tool called `npm` (yes the same name as the registry), and with `npm` there comes a little (very useful) tool called `npx`. This stands for something like "node package execute". It takes as an argument the name of a module from the NPM registry. Here it is `@modelcontextprotocol/server-filesystem`. What it does is

- download the code from this module and all its dependencies and transitive dependencies
- and execute it.

Normally, it asks the user if it should do that and he needs to confirm this. This wont work with an LLM. Therefore, we pass it the flag `-y` for "yes, do that!" in the `args` of our JSON snippet.

```json
"args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/username/Desktop",
      "/Users/username/Downloads"
    ]
```

What comes next in the snippet are arguments for the code that `npx` finds under `@modelcontextprotocol/server-filesystem` in the registry. This has nothing to do with access restrictions imposed onto Node.js. This is only for the module we execute. If you take a look at the code of this module, you will see that it does use these as "allowed directories" and it throws an error if the executor, here the LLM, tries to run code against other directories. So maybe this is enough security for you and you call it a day and call me a nerd or fearmonger. It is okay. See you.

For the rest of you who want to continue — bear with me. Here comes the trust thing again. I can look up the code for this module and see what it does, and NPM recently added a feature to see the actual code of a package in the registry, but the advice we get is to trust the package and all its future versions. Because the string `@modelcontextprotocol/server-filesystem` tells `npx`, "Hey, get the latest version of that module." You also often see `@modelcontextprotocol/server-filesystem@latest`, which is the same as the reference before. To be a little more secure, you could pin the version of the module whose author you trust. Adding the version number instead of latest would already make a big difference. `@modelcontextprotocol/server-filesystem@2025.8.21`. This is a little less convenient. You won't get the latest version once it is out, but you can vet the code on NPM and then use this one module. If you encounter any bugs, you can take a look at NPM again and see if a newer version is there that fixed that bug.

That's it, Fabian? This is why you add all those thoughts to the entropy of the web?

Well, no. The problem is still that the author trusted other authors. If he did not vet and pin his dependencies, there is still the chance that someone exchanges the code beneath our eyes without us knowing. In JavaScript and the NPM ecosystem, there is a little something that is called "semantic versioning". It tells `npm` that it is okay to use a specific range of versions of a module. Like saying, "All the bug fixes (also called patches) are okay." Or, "Yes, it is okay to use new version that is higher than the currently used one, as long as it does not break something." Which is a great idea but also means I have to trust the authors in my tree all the wy down.

In the recent supply chain attacks, this is what happened. Malicious actors took over the accounts of authors who are trustworthy and changed their modules by releasing a new patch version to the NPM registry. Since they were required by other modules, this code could have gotten added to your project without you even knowing.

What can we do about this? Vendoring all dependencies? Never touch a computer again? Ignore it?

## A More Complex but More Secure Solution

With a little effort, we should be able to run these tools in a more secure way. We need to cut the access for the command from the rest of the computer and still give it access to those two folders we want it to act on.

### Containers Instead of Bare Metal

Instead of installing Node.js directly onto our machine, we install [Docker](https://www.docker.com/) or even better [Podman](https://podman.io/). Podman and Docker are applications called container runtimes. As the name suggests, they containerize an application. Besides giving the application everything it needs to run, it also isolates the application from the host system, which is your computer[^poddocker]. They will serve Node.js for us where we can run the MCP services. I will show you the commands for Docker, since it is the more mature and widely used one. With more funding, more tutorials and it has an easy installable free version for MacOS.

The great thing about them is that we not only isolate the application, but we can also tell it specifically which folders are allowed to be accessed by the container. I will show you the command we have to add to our configuration and dissect it step by step.

### The More Secure MCP Configuration

```json
{
      "mcpServers": {
        "my-sandboxed-server": {
          "command": "docker",
          "args": [
            "run",
            "--interactive",
            "--rm",
            "--volume", "<absolute path to folder you want your LLM to have access to>:/usr/project",
            "--workdir", "/usr/project",
            "node:24-bookworm-slim",
            "npx",
            "-y",
            "@modelcontextprotocol/server-filesystem@latest",
            "/usr/project"
          ]
        }
      }
    }
```

- The first thing you see is we replace the `npx` command with `docker`. This is the executable we want to run.
- Then we add the `run` command which tells Docker to run a container.
- The `--interactive` allows you to feed input into the container while it's running (e.g., for a shell or an interactive program).
- `--rm` tells Docker to automatically delete the container's filesystem **after it exits**. This sounds like a bad idea since we want to interact with the filesystem.
- This is where the `--volume` comes in. We are telling Docker to connect a specific folder from the host system into the container. This way, the container can read and write to that folder, which is necessary for the filesystem MCP to function properly.
- The next entry `<absolute path to folder you want your LLM to have access to>:/usr/project"` is:
	- the absolute path to the folder you want your LLM to have access to on your system. You need to replace the `<path to folder>` with an actual path on your machine. On MacOS, you can get the absolute path of a folder by CTRL-clicking (`⌃`) or right-clicking on a folder and then, when the menu is open, holding OPTION `⌥`. This will change the `copy` entry to `copy "<folder name>" as pathname`.
	- After the `:` is the path inside the container. Here it is `/usr/project`. This is inside the container. The LLM will only see the path `/usr/project`.
	- If you want to be even more secure, you can restrict the container's access to your host to be read-only by adding `:ro` at the end of it all. But this will prevent the MCP from writing any files to that folder.
- `--workdir` tells the container to start in a specific directory, which is `/usr/project` in this case.
<!---
I think this created an error.
`--user` This tells the container to run as a specific user, in this case, `node`, which is a non-root user in the container. This is also a security measure to prevent potential exploits.
-->
- `node:24-bookworm-slim` This is the Docker image we are running our container from. You can choose a different version if you prefer. I just recommend using the [latest long term support (LTS) version of Node.js](https://nodejs.org/en/about/previous-releases). Take a look at <https://hub.docker.com/_/node>](https://hub.docker.com/_/node). There you can find a long list of available versions.
- Finally, we reached the point where we are at the same command as we had it before. We run `npx` but now it is properly sandboxed in a container.
- `-y` tells `npx` to automatically answer "yes" to any prompts, which is needed for the MCP server not to hang on prompts.
- `@modelcontextprotocol/server-filesystem@latest` is the package we want to run. As you already learned, I am using the less secure version where with the `latest` tag. **I urge you not to do that.** I use this here since any version number I add might be outdated in a few weeks. Go to [the version tab of the module](https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem?activeTab=versions) and get the version number you want to use.
- Last one. Then we are done. We now tell the module which path it should have access to. Here it is `/usr/project` This is the same path we connected or our local folder to earlier and we also set as the working directory for the container. This time, we are inside the container. The module has no "knowledge" of our host's filesystem.

With this more verbose version, we can now run the MCP server within a secure sandbox. Of course, we need to determine for each MCP we want to use if this is the right approach.

### Speeding Things Up

To make this work faster on the first run I would also suggest downloading the image beforehand. Yes some new word to make this short: The image is the blueprint from which the container is created. You can do this by running the following command in your Terminal.app:

```bash
docker pull node:24-bookworm-slim
```

If you find the Terminal.app scary. You can use the Docker Desktop application to pull images and manage containers with a graphical user interface (GUI). Just insert the `node:24-bookworm-slim` into the search bar from the Desktop application and download (pull) it from there.

## Bonus: Be Even More Restrictive

- Use `--network none` if network access isn't needed. This will prevent the container from accessing the internet.
- Use Podman instead of Docker if you want to run containers without root.

## Conclusion

Yes. This was a long one. I hope you found it informative and you could follow along. Using LLMs on our computers is marvelous. We are entering a new era of computing in my opinion. As always, this comes with a price. As the internet was also created with trust in mind (hi there, good old HTTP), we had to learn the hard way that there will be people misusing our trust. The only thing we can do is learn the tools and understand what is actually happening under the hood. If you have any questions, use one of the channels below to ask.

* * *

[^shaihulud]: Yes, pretty nerdy name, but we bless the maker and his water.
[^transitive]: Transitive means if my module A depends on module B and B depends on C, C is a transitive dependency of A.
[^poddocker]: The big difference between Docker and Podman is that the latter does not need root access to run containers. This makes it even more secure.
