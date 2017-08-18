---
layout: post
title: My Rant on Development Practices
date: 01.08.2017
published: False
tags: [development, university, rant, javascript]
categories: [development]
---

There are already a lot of rants about the state of (over)tooling, development style, scalability and what not. This is not news. My rant is aimed at my realm[^8]. The University.  

[![](https://imgs.xkcd.com/comics/tools.png)](https://xkcd.com/1629/)

---



Dear *(developer/student Let's call you:)* Johnny,  

The next time you build something that others should be able to use in a project, think twice about what cool new \[FRAMEWORK \|\| BUILD TOOL \|\| ENVIRONMENT\][^0] you use. It would be great to just pop up a terminal and run `npm install && npm start`, open [localhost:3000](http://localhost:3000) and be ready to go. Instead, I have to learn:  

- that cool new way to write commit messages because somebody thinks `git commit -a -m "I did something important"` is too verbose or not enough[^6]
- that fancy framework[^1] from, let's say Foobook™, for running a simple one-page application with three buttons that kick of some process
- that awesome IDE because those simple text editors are for old geezers
- that new JS flavor called MilkyScript[^7] that is so much superior to JS 
- you name it… 

Oh. I need to install a ton of global tools you run for compiling es2525 and beyond because we really need `import` instead of `module.exports` now everywhere. Of course, you did not tell me which version you installed half a year ago and did not update on a regular basis. 

After I dug through all those dependencies and got them installed I try to understand your `scripts` in `package.json` but they are all broken or written in Latin or executing a sub shell in elvish[^2]. Except for `dev` which compiles your es2525 every time even though I did not change anything.  

I almost forget to read your README entirely, because it is not enough to run `cd into/project/folder/ && npm install`. Of course not. You needed to symlink your `src` folder into the `app` folder to access your `modules` like `node_modules` (instead of using something that happens on [module level](https://github.com/patrick-steele-idem/app-module-path-node) and is cross-platform).  

Of course, you need that fully scalable multi site CMS to build the documentation of your project. No, you won't stick around to take care of this. You were just asked to set it up. When confronted with the question: "Why not use a static site generator?" the answer is "They feel so retro, but that's hip currently isn't it?". You tell me. Yeah – you need the big guns. I know.  

Did I mention the hard coded absolute path to your Library to fetch that platform specific framework for accessing that MongoDB YOU HAVE RU.... 😡

You get the gist.  

I get it that you need to play with those tools and where to try them out best? In projects. It's important you learn these things. But at what cost? The project will be abandoned at some point. That's for sure. By abandoning it in a state where only you can use it nobody will be able to build on it. That is sad because the project is pretty awesome. What bugs me about it that you took hours and hours of setting up your tool-chain. That time could have been used to work on real problems concerning your application logic or your concept. What is wrong with some VanillaJS, a tiny bit of HTML and some CSS toppings? and what is wrong with `;`?[^3]

Don't get me wrong - those tools a great, but they were build by a large group of developers at Foobook™ for, well, building Foobook™. 

You have to take some things into account before introducing a new tool.  

- Can you achieve the same thing without it in the time you use to learn it?  
- Will somebody else need to run it (if so write some docs)?  
- Will you write these docs or just put it down as a todo?  
- Is it portable to another computer without problems?  
- Where lies your focus? On the tool of the project?  
- Will you have to use this tool often?  
- And many more things…[^5]

I remember being the same. When I was at the same point of learning to write software, it was cool to run Processing in Eclipse, because Eclipse is the way better IDE _(long pause)_ NOT!  
A year or two later I tried to revive that project. It took me a long time to not accomplish it in Eclipse and some more time to port it back to Processing. Or another project where I started using Grunt. I have 304 lines of code in that Gruntfile.js. Now that project has been dormant for some time. Whenever I think "you could do something on it". I stop when remembering that Gruntfile.js and that I can't remember how to build. Yes, I could start looking at my documentation. Or not. Because writing docs are something I did not do at that time. I just coded the hell out of it because it is fun.  

So did you write documentation? Oh of course not. It is the end of the semester and it had to be done quickly because fiddling with all those cool toys took so much time…   

I could go on and on. This is not only for you Johnny. This mainly for myself to blow off some steam and to remind me to focus. I really would love to use `import` instead of `require` but not at the cost of always having to run a process that watches what I do and babels out some JS code my Node.js installation understands. The same thing goes for things like jQuery, Webpack, Rollup and so on. The things I build, like this site, actually don't need so many libraries. 73% of jQuery are not in use for this site. I could write everything in plain old boring JS.[^4]  

[![code coverage screenshot](/assets/images/blog/covarage-rant.png)](/assets/images/blog/covarage-rant.png)  

Yours sincerely,  
Fabian  

P.S. You don't agree with me? Let's talk about it on [Twitter](https://twitter.com/fmoronzirfas) or open an [issue on GitHub](https://github.com/fabianmoronzirfas/fabianmoronzirfas.github.io/issues).  
P.P.S. You feel like this is aimed at you? Well maybe…

<!-- footnotes -->

[^0]: Insert value here.
[^1]: Of course still in alpha!
[^2]: Or maybe it is the tongue of Mordor in Elvish script? I can't tell.
[^3]: Did I mention that your tiny Processing app does not work because you are so accustomed to leaving them out.
[^4]: Which is an [issue](https://github.com/fabianmoronzirfas/fabianmoronzirfas.github.io/issues/4).
[^5]: I'm actually not sure if these are the right questions. Educate me if you want.
[^6]: I know [commit message quality](https://xkcd.com/1296/) tend to decline over time, still…
[^7]: Actually not a flavor more some sort of esoteric way of writing JS like [jsfuck.com](http://www.jsfuck.com/). Or [Hieroglyphy](http://patriciopalladino.com/files/hieroglyphy/). See [this](https://gist.githubusercontent.com/fabianmoronzirfas/cb08fb6dadd29fa8d5bdf20a8e017486/raw/7175a2ec3d9b4935a02d40f08f65d276997415e7/alert-hello-world.js) and paste it into your console. I dare you.
[^8]: At least this will be my realm until the end of August. But more about that in a later post.
