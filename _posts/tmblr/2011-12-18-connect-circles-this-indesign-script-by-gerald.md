---
layout: post
title: "Connect Circles\n\nThis InDesign script by Gerald Singelmann connects 2 circles
  with a line. In InDesign: Make 2 circles, select them and run the script.\ncool
  codeif (app.selection.length == 2) main();\n    function main() { \n    var c1 =
  app.selection[0]; \n     var c2 = app.selection[1]; \n     var gb = c1.geometricBounds;
  \n     var r1 = (gb[3]-gb[1])/2; \n     var x1 = gb[1] r1; \n     var y1 = gb[0]
  r1; \n     gb = c2.geometricBounds; \n     var r2 = (gb[3]-gb[1])/2; \n     var
  x2 = gb[1] r2; \n     var y2 = gb[0] r2; \n     //~ var gl = c1.parent.graphicLines.add();
  \n     //~ gl.paths[0].pathPoints[0].anchor = [x1,y1]; \n     //~ gl.paths[0].pathPoints[1].anchor
  = [x2,y2]; \n     var alpha = Math.atan2 (y2-y1, x2-x1); \n     var dx1 = Math.cos(
  alpha ) * r1; \n     var dy1 = Math.sin( alpha ) * r1; \n     var dx2 = Math.cos(
  alpha ) * r2; \n     var dy2 = Math.sin( alpha ) * r2; \n     var x11 = x1   dx1;
  \n     var y11 = y1   dy1; \n     var x21 = x2 - dx2; \n     var y21 = y2 - dy2;
  \n     var gl = c1.parent.graphicLines.add(); \n     gl.paths[0].pathPoints[0].anchor
  = [x11,y11]; \n     gl.paths[0].pathPoints[1].anchor = [x21,y21]; \n     }"
date: '2011-12-18T14:05:05+01:00'
tags:
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/14400788746/connect-circles-this-indesign-script-by-gerald
---
Connect Circles

This InDesign script by Gerald Singelmann connects 2 circles with a line. In InDesign: Make 2 circles, select them and run the script.
cool codeif (app.selection.length == 2) main();
    function main() { 
    var c1 = app.selection[0]; 
     var c2 = app.selection[1]; 
     var gb = c1.geometricBounds; 
     var r1 = (gb[3]-gb[1])/2; 
     var x1 = gb[1] r1; 
     var y1 = gb[0] r1; 
     gb = c2.geometricBounds; 
     var r2 = (gb[3]-gb[1])/2; 
     var x2 = gb[1] r2; 
     var y2 = gb[0] r2; 
     //~ var gl = c1.parent.graphicLines.add(); 
     //~ gl.paths[0].pathPoints[0].anchor = [x1,y1]; 
     //~ gl.paths[0].pathPoints[1].anchor = [x2,y2]; 
     var alpha = Math.atan2 (y2-y1, x2-x1); 
     var dx1 = Math.cos( alpha ) * r1; 
     var dy1 = Math.sin( alpha ) * r1; 
     var dx2 = Math.cos( alpha ) * r2; 
     var dy2 = Math.sin( alpha ) * r2; 
     var x11 = x1   dx1; 
     var y11 = y1   dy1; 
     var x21 = x2 - dx2; 
     var y21 = y2 - dy2; 
     var gl = c1.parent.graphicLines.add(); 
     gl.paths[0].pathPoints[0].anchor = [x11,y11]; 
     gl.paths[0].pathPoints[1].anchor = [x21,y21]; 
     }—Zwei Kreise mit einer Linie orthogonal verbinden - Adobe InDesign Skriptwerkstatt - HilfDirSelbst.ch - Forum
