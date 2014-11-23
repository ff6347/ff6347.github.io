---
layout: post
title: "How to Spin a DC Motor with the Arduino - For Dummies"
date: June 27, 2014 at 09:40AM
tags: arduino, motor, hook-up-guide
---
##How to Spin a DC Motor with the Arduino - For Dummies
The DC motor in your Arduino kit is the most basic of electric motors and is used in all types of hobby electronics. When current is passed through, it spins continuously in one direction until the current stops. Unless specifically marked with a + or -, DC motors have no polarity, meaning that you can swap the two wires over to reverse the direction of the motor.

The Motor sketch
You will need a simple control circuit to turn your motor on and off.

You need:

An Arduino Uno

A breadboard

A transistor

A DC motor

A diode

A 2.2k ohm resistor

Jump wires

To power the motor, you need to send 5V through it and then on to ground. This voltage spins the motor, but you have control of it. To give your Arduino control of the motor’s power, and therefore its rotation, you place a transistor just after the motor.

The transistor is an electrically operated switch that can be activated by your Arduino’s digital pins. In this example it is controlled by pin 9 on your Arduino, in the same way as an LED except that the transistor allows you the turn the motor circuit on and off.
[link to source](http://ift.tt/1wEfBEV) 
