---
layout: post
title: Launch Terminal from Extendscript
date: '2012-03-06T13:18:40+01:00'
tags:
- code
- javascript
- extendscript
tumblr_url: http://fabiantheblind.tumblr.com/post/18844415298/launch-terminal-from-extendscript
---
This litte snippet is quite powerfull. It Creates a .term (Mac OS only) file and excutes it. So now i can’t write scripts that do all kinds off stuff…
The most important thing is the key “ExecutionString” and his string.

    createTermFileAndExecute();
    function createTermFileAndExecute(){
    var path = Folder.selectDialog("Select a output folder...");

    var termfile = new File(path.fsName + "/Testfile" + ".term");
    termfile.open("w");
    termfile.writeln("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
    "<!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\""+
    "\"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n"+
    "<plist version=\"1.0\">\n"+
    "<dict>\n"+
    "<key>WindowSettings</key>\n"+
    "<array>\n"+
    " <dict>\n"+
    "<key>CustomTitle</key>\n"+
    "<string>My first termfile</string>\n"+
    "<key>ExecutionString</key>\n"+
    "<string>cd ~/Desktop; open .</string>\n"+
    "</dict>\n"+
    "</array>\n"+
    "</dict>\n"+
    "</plist>\n");

    termfile.close();
    termfile.execute();
    }
