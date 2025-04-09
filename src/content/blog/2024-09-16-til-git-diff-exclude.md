---

title: "Exclude files from git diff"
pubDate: 2024-09-16
tags: [git]
categories: [misc]
published: true
---

Normally the  `git diff` in a Node.js project with a package-lock.json present is a bit noisy. TIL to exclude a file from the diff.

```bash
git diff -- . ':!package-lock.json'
```
