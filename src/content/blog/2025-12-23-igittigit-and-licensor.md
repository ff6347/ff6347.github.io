---
title: "igittigit and licensor"
pubDate: 2025-12-23
tags: ["go", "tools", "license", "gitginore"]
categories: ["tech"]
published: true
description: "CLI tools for retrieving gitginore templates and license files vibe coded in go"
---


I just published two tools I recently vibe coded to scratch an itch.

- `igittigit` [github.com/ff6347/igittigit](https://github.com/ff6347/igittigit) Pulls `.gitginore` templates into your current directory. I am trying to move aways from to much VSCode use to Zed. One thing I am missing from VSCode is the [ gitignore extension (github.com/CodeZombieCH/vscode-gitignore)](https://github.com/CodeZombieCH/vscode-gitignore). So I created something similar for the command line.
- `licensor` [github.com/ff6347/licensor/](https://github.com/ff6347/licensor/). Same goes for the [licenser extension (github.com/ymotongpoo/vsc-licenser)](https://github.com/ymotongpoo/vsc-licenser). I normally need a LICENSE file for every project. So this pulls licenses from choosalicense.com's git repo and also some more Creative Commons licenses.

Both tools can be downloaded as binaries from their GitHub release pages, installed via go or build from source. If you trust me that much you can also can install them directly from my homebrew tap.


```bash
brew install ff6347/tap/licensor
brew install ff6347/tap/igittigit
```

Yes! I vibe coded them. Since I am no go developer and I am to busy to build this without an AI doing the coding.

Any feedback is welcome.
