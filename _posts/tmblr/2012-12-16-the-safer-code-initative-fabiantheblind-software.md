---
layout: post
title: 'The Safer Code Initative @fabiantheblind software  '
date: '2012-12-16T14:56:51+01:00'
tags:
- code
- script
- After Effects
- update
- Safer Code
- fabiantheblind
- aescripts
tumblr_url: http://fabiantheblind.tumblr.com/post/38060865077/the-safer-code-initative-fabiantheblind-software
---
Some users of my scripts pointed out a bug where scripts had a strange behaviour that never occured while developing and could not be reproduced on my setup. The problems that lead to that where these:
- My scripts where using for(var key in obj) loops on simple Arrays. This is considered unsafe programming and did create an error because other script authors where creating their own prototype functions on Arrays. Fortunatly Kevin Shires pointed that flaw out and saved me a lot a lot of debugging time.
- Also where my scripts to “open” in their programming structure. There where a lot of global objects and functions floating around.

These flaws are now history and new versions are online with,Uniquer Names, Better Encapsulation and Safer Programming!

Check out:
- AEMap v0.4
- Locations v0.2
- Swissd v0.2
- Obj Vertex Export v0.3
- Timeremap Source v0.3
- wihihihiggle script  v0.2.3

Thanks Kevin
