---
layout: post
title: "Fritzing Project – Optocoupler"
date: April 03, 2014 at 10:26AM
tags: fritzing, optocoupler
---
##Fritzing Project – Optocoupler
An optocoupler can be used to control a circuit that's completely isolated from your microcontroller. In this case, imagine that the LED and battery pack are a hacked toy which you're turning on and off with Arduino.
Use an optocoupler such as the 4N35. Connect the optocoupler's pin 2 through a 220Ω resistor with Arduino's pin 11, and pin 2 with Arduino's ground. Then connect your external circuit to pins 5 (collector) and pin 6 (emitter). You can also apply voltage to pin 4 (base) of the optocoupler to raise the gain (just like with a normal transistor).
[link to source](http://ift.tt/1h6suCT) 
