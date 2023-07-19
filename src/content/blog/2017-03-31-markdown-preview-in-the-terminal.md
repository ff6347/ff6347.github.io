---
layout: ../../layouts/post.astro
title: Markdown Preview in the Terminal
pubDate: 2017-03-31
published: True
tags: [markdown, code]
categories: []
---

So how can we preview Markdown files in the terminal? There is of course [mdless by Brett Terpstra](http://brettterpstra.com/projects/mdless/), but what if you don't want to use a ruby gem (for some kind of wired reason). The best solution I found is a combination of two tools [pandoc](http://pandoc.org/) and [lynx](http://lynx.browser.org/).

Together you can turn them into a handy function to preview your markdown files when you are logged into that machine on the other side of the world.

If you are using fish add this to your functions under `.config/fish/functions/mdview.fish` (mdview is the name of the function and the file you will have to create).

There are some sanity checks in there that look if pandoc and lynx are installed. If not on macOS run `brew update && brew install pandoc lynx`.

```shell
function mdview
if set -q argv
  switch $argv
    case -h
      echo "[M↓] Help"
      echo "call the mdview with a Markdown [M↓] file as argument"
      echo "this script needs pandoc and lynx installed"
      echo "on macOS run 'brew install pandoc lynx'"
    case "*"
      # check if pandoc is installed
      if pandoc -v >/dev/null do
      # check if lynx is installed
        if lynx -version >/dev/null do
          # run the magic
          # pass the file to pandoc
          # it will be converted to HTML and go to stdout
          # pipe it into lynx stdin
          pandoc $argv | lynx -stdin
        else
          echo "lynx is not installed"
        end
      else
        echo "pandoc is not installed"
      end
    end
  end
end
```

For bash/zsh this should be something like this in its simplest form.

```shell
#!/bin/bash
function mdview (){
    # pipe it into lynx stdin
    pandoc "$1" | lynx -stdin
}
```

Have fun.
