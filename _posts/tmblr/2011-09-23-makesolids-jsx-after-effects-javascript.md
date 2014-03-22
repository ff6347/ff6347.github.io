---
layout: post
title: makeSolids.jsx After Effects Javascript
date: '2011-09-23T14:45:49+02:00'
tags:
- javascript
- After Effects
- script
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/10554843506/makesolids-jsx-after-effects-javascript
---

// makeSolids.jsx
// this tiny AE CS 5 Script generates random colored solids
// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// info [at] the - moron . net
// This script is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
// This script is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see gnu.org/licenses
// run
main();
// here it happens
function main(){
// get the current active composition
var curComp = app.project.activeItem;
// if ther is no comp
    if (!curComp || !(curComp instanceof CompItem))
    {
        // alert and end the script
        alert("Please select a Composition.");
        return;
}
// start undogroup
app.beginUndoGroup("make_solids");
// get all the layers
//var sellayers = curComp.selectedLayers;
var num = 400;
// get them all into an array
//var layers = new Array();
    for (var i = 0; i < num; i++) 
    {
        //layers.push(sellayers[i]);
        var r = 0.5 + Math.random();
        var g =  Math.random();
        var b = 0.5 + Math.random();
        var a = 0.5 + Math.random();
        var s = curComp.layers.addSolid([r,g,b], "discoSolid " + i, 50, 50, 1, curComp.duration);
        s.opcity = a * 100;
        }
    //end undogroup
app.endUndoGroup();
}
