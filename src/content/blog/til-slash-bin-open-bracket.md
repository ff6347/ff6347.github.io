---
layout: ../../layouts/post.astro
title: "Today I Learned about /bin/["
pubDate: 2023-11-26
tags: [til]
categories: [tech]
published: true
---


Once I saw in `/bin` a file `[`. Since I don't want to destroy the fabric of my little unixiverse I thought: Maybe some leftover of some command gone wrong or whatever. I did a `¯\_(ツ)_/¯` and moved on. 

Today I learned:

When you write a script like this:

```bash
if [ a = b ]; then
	echo "a equal to b"
fi
```

You don't use a language built in expression. You run with the executable `/bin/test`. Because `/bin/[` is an alias for `/bin/test`. The only difference is that `[` looks for the closing `]` to even things out. 

So the script above could also be :

```bash
if test a = b; then
	echo "a equal to b"
fi
```

🤯

source: https://jmmv.dev/2020/03/test-bracket.html via Hacker News