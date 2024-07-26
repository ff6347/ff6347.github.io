---
layout: ../../layouts/standard.astro
title: Projects
---

These are some projects I spend my free time on. Others are part of my work at the University of Applied Sciences Potsdam (Germany) but not related to any seminar.

---

## Contents

## P5 Codesandbox

To iterate quickly on some p5.js snippets I built a live coding environment based on the Monaco Editor and the p5.js library. It is a simple way to write and run p5.js code in the browser with direct feedback. !Warning there is no infinite loop protection! You can find it [here](https://p5.inpyjamas.dev/).

## Notes

To quickly write down some notes I built this small app. It uses content editable divs and saves the content to local storage. You can find it [here](https://notes.inpyjamas.dev/).

## Script Plugins

Since around 2009 I've been writing scripts to automate my design workflows. Some made it to become a integral part of my <a href="/work/">work</a> like the scripts for the mediaplanungonline.de which can be [found here](https://github.com/fabianmoronzirfas/mpo-id-tools). Others became products that I sell on [aescripts.com](http://aescripts.com/authors/f-l/fabiantheblind/). Below you can see some of the demo videos for the later ones.

<div class="thumbs">

<!-- locations -->
<iframe src="https://player.vimeo.com/video/54717636?loop=1" width="100%" height="232" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<!-- swissd -->
<iframe src="https://player.vimeo.com/video/53158182?loop=1" width="100%" height="232" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<!-- monoline -->
<iframe src="https://player.vimeo.com/video/64222693?loop=1" width="100%" height="232" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<!-- aemap -->
<iframe src="https://player.vimeo.com/video/39960358?loop=1" width="100%" height="232" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

</div>
<div class="clear-float">
</div>

## Basil.js

Since this summer I started to work on [Basil.js](http://basiljs.ch/) togther with Benedikt Groß, Ted Davis and Timo Rychert. It is a creative coding framework that ports the spirit of the Processing visualization language to Adobe InDesign. We are working on fixing bugs and implement some additional features to make it more Processing like. This will also be part of my <a href="/teaching/#gestalten-in-code">Gestalten in Code</a> seminar.

## ExtendScript Wiki

Since October 2012 I'm assembling a wiki about [ExtendScript](https://en.wikipedia.org/wiki/ExtendScript). It is with around 100 articles one of the largest resources you can find about writing scripts for Adobe applications. Take a look into the [Extendscript Wiki](https://github.com/extendscript/wiki/wiki)

## Extendscriptr

Extendscriptr is NPM CLI module that allows you to benefit of many modern javascript features of es5 and es6 in a es3 ExtendScript environment developed by Lucas Vogel and me.

[github.com/ExtendScript/extendscriptr](https://github.com/ExtendScript/extendscriptr)

## Extendscript-bundlr

A tool for bundling Adobe ExtendScripts that use the `//@include 'path/to/file'` or `#include 'path/to/file'` statement.

[github.com/fabianmoronzirfas/extendscript-bundlr](https://github.com/fabianmoronzirfas/extendscript-bundlr)

## Is The Lab Open?

[interface.fh-potsdam.de/is-the-lab-open/](https://interface.fh-potsdam.de/is-the-lab-open/)

> what
> This site is an experiment on location based triggers. Whenever a student needs to know if the Interface Lab is open for consultation he just can load the site. It tells you if the lab is open.

> why
> Short version: "Because we can." Long version: "It often occurs that students ask per email if the lab is open. This is a simple way to find out. Also it is a test if location based triggers work accurate.

> how
> On the mobile device of the lab supervisor is a location based trigger installed with <a href="https://ifttt.com">ifttt.com</a>. If he enters the area IFTTT calls the API of the application.The sent value is cached for faster response times. According to the result of the cached data the application presents the information when the user loads the site. For further and deeper insight check out the open source <a href="https://github.com/FH-Potsdam/is-the-lab-open">code at github.com</a>

## Bonanza

Bonanza is a material management system developed for the Interface Lab at the University of Applied Sciences Potsdam (Germany). Programming is done by Phillip Geuder and Stefan Hintz. Design by Sebastian Kaim. Project management by Colette Hampel and me. Currently there is no public source available.
