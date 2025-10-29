---
title: "Obsidian Plugins"
pubDate: 2025-10-29
tags: [obsidian,development]
categories: [tools]
published: true
description: "Two obsidian plugins I'm working on. One for HTML,CSS and JS/TS snippets and one for using the canvas as context with LLMs."
---

Since I am studying again, and I have a lot of text and notes to handle, I moved to obsidian. And of course I'm trying out the plug-in development. These are mostly coded using an LLM assistant, but I'm trying to review every bit. The plug-ins are not yet published to the obsidian community plug-ins registry but there are easy ways to install these without hacking too much.

> [!NOTE]
> The latest version are in the beta channels not the latest on the main stable branch. Be on the edge with me

## Web Dev Playground

This plugin allows you to write a note with HTML, CSS and JavaScript or Typescript code blocks and view a compiled page in the sidebar.  Only the content of the code blocks is added to the page. There is no auto-complete, no linting, no formatting. Only code blocks that are denoted as the specific languages are parsed. Code blocks without language or with other languages like python or what whatsoever are ignored. The plug-in does auto compile and has an infinite loop protection. That's it.

It really has become useful to create little notes about web development that I can see directly. Helps also to check if the code really works. I'm looking for input on this.

You can get the current state from this repo → [github.com/ff6347/obsidian-web-dev-playground](https://github.com/ff6347/obsidian-web-dev-playground) or you use [BRAT](https://tfthacker.com/BRAT) plugin into install it.

## Canvas Context

This is a large undertaking and I'm dog fooding this currently. The idea is to use the canvas as context provider for interaction with large language models. You can select a card or note on the canvas and plug-in will walk up the tree and pull in all the notes to create a message. You can send to last language model. There are some rules that I'm not going to explain here because this is part of the repository end of the journey. Maybe you [use the discussions](https://github.com/ff6347/obsidian-canvas-context/discussions) on GitHub for feedback?

You will need LM Studio or Ollama if you want to run local models. If you want to use the big models you need an OpenRouter or OpenAI API key.
You can get the current state from this repo →  [github.com/ff6347/obsidian-canvas-context](https://github.com/ff6347/obsidian-canvas-context) or you use [BRAT](https://tfthacker.com/BRAT) plugin into install it
