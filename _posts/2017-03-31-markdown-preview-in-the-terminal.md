---
layout: post
title: Markdown Preview in the Terminal
date: 2017.03.31
published: True
tags: []
categories: []
---

How to make `cat` have colored output?

    sudo easy_install Pygments

Then edit your `.bashrc`, `.bash_profile` or `.zshrc` and add the following line:  

    alias dog="pygmentize -g"

Source it and you are good to go.  

    dog myfile

Will give you colored output. Nice!

---

Found around [the web.](http://stackoverflow.com/questions/7851134/syntax-highlighting-colorizing-cat)