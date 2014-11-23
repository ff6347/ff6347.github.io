---
layout: post
title: "The benefit of coding"
date: 2012-09-22T13:29:31+02:00
tags:
- code
- InDesign
- javascript
tumblr_url: http://fabiantheblind.tumblr.com/post/32042886875/the-benefit-of-coding
---
While a we print production a problem came up. One of the designers used RGB colors within InDesign on some bitmaps. We tried to use the InDesign Object Search but the color is applied to the image within a rectangle. So the search didn’t find it.
How to fix that?
The designer (lets call her Frennzy) with that particular problem went on and fixed it by hand. Due to the fact that we had about 340 pages I wanted to be shure that if this problem pops up on different .indd files I have a quick fix for that.
So I began to write this tiny piece of code. https://gist.github.com/3765595

Meanwhile Frennzy was clicking into each bitmap she found with that RGB color and changed it to the swatch black. My code was done when she was done. So we didn’t use it.
So what is the benefit?
The gist is: The manual work will always need the same time. My code can now fix this in a second.
