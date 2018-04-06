---
layout: post
title: "openFrameworks - App Crashes After Transfer to Another Computer"
date: 06.04.2018
tags: [openFrameworks, App, macOS, Gatekeeper]
categories: [application]
published: True
---

*!Note: Actually written on 29.11.2017*  

I had a learning today that I want to share with you because it will reappear again and again when we develop applications with openFrameworks.

We had the wired problem that OF Apps crashed on startup when we passed them over to other computers. It seemed quite random. Passed on a USB device. They launched fine. Passed on in a .zip over Slack or via GitLab they did not launch.  

Crash on Double Click

**TL;DR** Since macOS (formaly OSX 10.5) there is a security setting in place that prevents apps that where downloaded from the web to be executed. it is a part of the GateKeeper. To overcome this you once need to move manually the "Fancy ofApp.app" to another location on your computer and then move it back next to its data folder. Then you should be able to execute the app.

More technical

The feature is called "App Translocation". The new application gets a xattr flag called com.apple.quarantine. This flag holds information when and with which Browser the app was loaded. The app will be moved on execution to a hidden temp folder and executed there. Having a .dmg with a "Move To Applications" link is not enough. The flag stays. Only when you move the App manually this gets removed. You can also inspect the xattr by running:

    xattr "Fancy ofApp.app"

This will show you the flag com.apple.quarantine

With

    xattr -p com.apple.quarantine "Fancy ofApp.app"

You can see its content.

To remove this from the commandline use:

    xattr -dr com.apple.quarantine "Fancy ofApp.app"

You can read some more about this behind those links:

App Translocation  

[Source: macOS Sierra will break many installers and updaters – The Eclectic Light Company](https://eclecticlight.co/2016/06/16/macos-sierra-will-break-many-installers-and-updaters/)  