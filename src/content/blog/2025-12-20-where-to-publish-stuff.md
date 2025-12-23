---
title: "Where to publish code if not on GitHub?"
pubDate: 2025-12-20
tags: [msft, code, hosting, sovereignty, techno-feudalism]
categories: [tech]
published: true
description: "Thoughts on digital sovereignty from US big cloud in times of techno feudalism with a focus on code hosting and publishing"
---

Lately if been using the the phrase "if it's free, you're the product" pretty often. For search I use Kagi.com. For mail I use Fastmail, ProtonMail and Uberspace and pay for them.
I've stopped looking at and feeding into social media networks over the past few years. You can find the occasional image from the street on Mastodon from me, but the rest isn't that interesting anymore. I don't doom-scroll any of them - except for Hacker News.

So now here is my problem. I publish a lot on GitHub -- Owned by MSFT. I have over 600 repositories, many of them Abandonwear™, or just some proof of concept, some code for workshops, some organization dedicated to a specific topic, some CLI or web tools and what not. I think I built some kind of portfolio there and for developers it is currently the de facto place to show their work.
If I ask one of the (sota) large language models: who is Fabian Morón Zirfas? I get a pretty accurate description of what I have been doing over the last 15 years. I joint GitHub in 2010 so I am seeing and I walked the path of [enshittificantion](https://en.wikipedia.org/wiki/Enshittification) with them (which seems inevitable for such a large project). I still think it is a okayish product but there are some parts that are becoming wired and clunky. The most important thing though is **digital sovereignty from the bigcorp-clouds in the US**. I've been reading Technofeudalism: What Killed Capitalism by [Yanis Varoufakis](https://www.yanisvaroufakis.eu/) and I get the impression that it is more important than ever that we take a path other then throwing all our data into the beast just out of convenience.

So what are the alternatives (besides self-hosting)?

I guess the realistic options are Codeberg and Sourcehut.

- [Codeberg](https://codeberg.org/) Germany and a non-profit e.v.
- [sourcehut](https://sr.ht/) Netherlands for profit but with a strong ethos about open source.

I need to checkout if my usual workflows are supported. Gitflow publishing to Cloudflare, Netlify and NPM package registry. The occasional image going to Docker Hub might be needed[^1]. Working with LLM coding agents makes this even harder, since they are integrated with GitHub or maybe GitLab but that is it.

Bitbucket (US and Atlassian) and GitLab (also US) are not as big as MSFT but still operated on us soil under their law.

- [Bitbucket](https://bitbucket.org)
- [GitLab](https://gitlab.com/)

A whole other thing. Decentralized git hosting on your own infrastructure (called knot) based on atproto with tangled as the frontend as I understand it.

- [Tangled](https://tangled.org/)

This is an open ended post I guess. If someone is reading this, any opinions on that, what do you do? And one last question comes still to my mind. Should I mirror important projects?

[^1]: Yes while writing it I see the next challenge coming up.
