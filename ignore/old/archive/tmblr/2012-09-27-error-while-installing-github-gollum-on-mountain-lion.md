---
layout: post
title: "Error while installing Github gollum on Mountain Lion"
date: 2012-09-27T20:37:52+02:00
tags:
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/32404222844/error-while-installing-github-gollum-on-mountain-lion
---
The makefile references is wrong
    /usr/bin/gcc-4.2

added a symlink to it

sudo ln -s /usr/bin/llvm-gcc-4.2 /usr/bin/gcc-4.2


http://stackoverflow.com/a/9027883
