---
layout: post
title: git .gitignore?
date: '2012-09-18T13:38:02+02:00'
tags:
- git
- github
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/31791180715/git-gitignore
---
I didn’t know how to tell git to except a file from the ignore. Like your code creates a bunch of .txt files and you don’t want to commit them and clutter your repo. But you need a certain .txt file to be included into that repo.
Add a .gitignore file that looks like this:

*.txt
!LICENSE.txt


Important is to call the !LICENSE.txt after the *.txt call. Or the .gitignore won’t recognize the excepted file.
