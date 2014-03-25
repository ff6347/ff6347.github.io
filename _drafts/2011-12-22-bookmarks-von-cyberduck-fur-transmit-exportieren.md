---
layout: post
title: Bookmarks von Cyberduck für Transmit exportieren
date: '2011-12-22T11:20:12+01:00'
tags: []
tumblr_url: http://fabiantheblind.tumblr.com/post/14611408899/bookmarks-von-cyberduck-fur-transmit-exportieren
---
ischeriad:

Transmit (4.1) hat zwar eine Option Favorites->Import from->Cyberduck…, erkennt aber nicht die von Cyberduck (4.1) gespeicherten Bookmarks.
Cyberduck speichert seine Bookmarks in ~/Library/Application Support/Cyberduck/Bookmarks/ als *.duck. Das sind einfache XML-Dateien, die das Lesezeichen in einem `<dict></dict>` enthalten.
Transmit erwartet eine XML-Datei, deren Name auf .plist endet, in der jedoch die einzelnen `<dict>`s zusätzlich in einem `<array></array>` zusammengefasst sind.
Um nun aus allen Cyberduck-Bookmarks eine .plist für Transmit zu machen, habe ich folgendes bash-Skript gebastelt.

```shell
#!/bin/bash
echo ''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>''

shopt -s nullglob
DIRECTORY=~/Library/Application\ Support/Cyberduck/Bookmarks/
cd "$DIRECTORY"
for file in *
    do sed -ne ''/dict/,/\/dict/p'' "$file"
done

echo ''</array> </plist>''
```

Dies kann nun z. B. so verwendet werden:  

```shell
$ ./cyberduck2transmit.sh > cyberduck_bookmarks.plist
```

und dann in Transmit importiert werden.
Alle Angaben ohne Gewähr :).
