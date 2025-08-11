---
title: "Agentic Search (POC)"
pubDate: 2025-06-24
tags: [search, ai, programming]
categories: [programming]
published: true
---

I have been tinkering (semi vibe coding) an agentic search using OpenAI and the Brave Search API over the weekend. I am sure there are some problems and edge cases but I am pretty happy with the result. I thought there is more to it.

The core logic is giving the LLM a tool it can call and have some break conditions so it does not end up in an infinite loop. See the proof of concept here [https://github.com/ff6347/agentic-search-poc](https://github.com/ff6347/agentic-search-poc).

You will have to bring your own Openai API key and the Brave Search API key though.
