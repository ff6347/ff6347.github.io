---
layout: post
title: "How to: Delete a remote Git tag - Nathan Hoad"
date: September 16, 2014 at 10:57AM
tags: git, howto, tags, tag, delete
---
##How to: Delete a remote Git tag - Nathan Hoad
You probably won't need to do this often (if ever at all) but just in case, here is how to delete a tag from a remote Git repository.

If you have a tag named '12345' then you would just do this:

    git tag -d 12345
    git push origin :refs/tags/12345
[link to source](http://ift.tt/1AftkUr) 
