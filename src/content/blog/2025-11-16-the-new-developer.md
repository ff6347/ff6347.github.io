---
title: "The New (Old) Developer"
pubDate: 2025-11-16
tags: [programming,ai,development,opinion]
categories: [opinion]
published: true
description: "Sunday morning musings about developing with AI and why automating the juniors away is a bad idea."
---

I'm am pretty sure this has been said already on the internet. I still want to write down my thoughts &#x2014; just for me and maybe you get some insight to.

It's Sunday morning, 6:15, and I'm sitting in my kitchen[^1]. So I had this idea about this  project we've been working on in the last workshops session about AI at @fh-potsdam.

This is not a mission critical project. It's totally vibe-coded, but I'm still putting in some thought because I like how it turned out.

Since it's 6:15, I really don't want to get to my computer and start hacking away. Also, my little son is sleeping in my bed, so there's no place to start hacking.

Enter Claude Code for the web.

Just for fun, I described my idea to Claude Code on my phone in a few words and let it hack away on this small refactor. Then there comes this other idea while thinking about the first one, and I spin up a second session and let Claude hack on this idea as well.

Now, while I'm writing this, I have already two pull requests waiting for me to review them and I am still [in my pyjamas](https://inpyjamas.dev/).

---

Another project. For a seminars about language as an interface, I started to build a prototype for an iOS application. Since I know [shad/cn](https://ui.shadcn.com/) a little and we got introduced to [Figma Make](https://www.figma.com/make/) in the last session, I prompted my way to a visual draft of my iOS application within 30 minutes. I took screenshots of this application and passed them on to Claude in Xcode. After another 30 minutes and some debugging with Claude, I had a working first draft of my application on my phone. Now I'm in the stage of this project to test out the UX and write tickets for Claude. Since I am not familiar with Swift, it is the developer, and I am the project manager (PM). Creating this prototype would have taken me weeks to learn the basics of Swift and SwitftUI to get where I am now after about half a day.

---

Bottom line: These tools are really a game changer, and I'm sure some of the AI skeptics and hardcore developers will tell me about non-maintainable code and all those things, it taking away the fun in coding, watch out for the robot apocalypse, **KILL ALL HUMANS KILL ALL HUMANS**, and so on… But still, I am not a developer per se, I'm not a pure visual designer. I'm a creative technologist, and my main field is creating ideas, exploring technology and building prototypes. Yes, sometimes I do fullstack work, and yes, sometimes I do frontend work. But for these projects mentioned above, I'm the designer, I'm the project manager, and I'm the creative director and I am enabled to create these artifacts in such a short period that would never have been possible three years ago.

So, why writing all this? The problem we have is that I am developing software since more or less 15 years[^2]. I have been writing scripts even longer. For Adobe InDesign, for example when working on layouts with [Grenzfarben](https://www.grenzfarben.de/). I started creative coding in around 2007 or 2008 with Processing. I used Open Frameworks. I used Terraform. I used AWS. I used Postgres and SQLite. I used docker a lot. I used JavaScript in the front and back-end. I am dipping my toes into Ruby right now. So, there is a lot of coding experience under my belt. That's why I'm confident that I can build such projects and also debug them later on. Or decide if this is just a prototype or something to pursue. I can ask questions about it, and I can answer to colleagues what is happening in there even if I haven't internalized Swift + SwiftUI.

During my time at the University of Arts Braunschweig, I also taught students of the visual communications how to code with JavaScript on the front-end and later on we started vibe coding. Every time when they were vibe coding, the assistant pumped out code that they couldn't explain and had to depend on the assistant to do changes. They pretty often came 70-80% of the way and then got stuck.

So when we are automating away all those juniors, we will end in a state where there is nobody to debug our code because the greybeards will die out, and then you are left with vibe coders and 80% of your project done my dear PM of the future.

[^1]: Yes, I know it's early, but this is another topic.
[^2]: This sounds wired. It is not the problem that **I** am developing but keep in reading above.
