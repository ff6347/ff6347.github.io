---
layout: post
title: "sequencer.jsx A Panel 4 After Effects "
date: 2011-09-18T11:15:00+02:00
tags:
- javascript
- script
- code
- After Effects
tumblr_url: http://fabiantheblind.tumblr.com/post/10352726674/sequencer-jsx-a-panel-4-after-effects
---



// this script ofsets the selected layers on a chosen amount
// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas
// http://www.the-moron.net
// info [at] the - moron . net
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/
{
    var sq_data = new Object(); // Store globals in an object
    // global variables
    sq_data.len = 1;
function sequence(thisObj) {
   function sequence_buildUI(thisObj) {
      var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Sequencer", [100, 100, 300, 280]);//
            pal.orientation = "column";
        pal.alignment = ["fill","fill"];
      var buttonOne = pal.add("button");
      buttonOne.text = "Sequence selection";
      var grp = pal.add ("group");
      grp.preferredSize = [150,30];
      var statictextTWO =  grp.add("statictext");
      statictextTWO.text = "with frame offset: ";
      var eTxt = grp.add("edittext");
      eTxt.preferredSize = [55,20];
      eTxt.text = "1";
      buttonOne.size = [165, 30];
            pal.layout.layout(true);
            pal.layout.resize();
            pal.onResizing = pal.onResize = function () {
                this.layout.resize();
                }
            pal.onShow = function (){
                pal.layout.layout();
                 pal.minimumSize = pal.preferredSize;
                }
                 eTxt.onChanging  = function (){sq_data.len = parseInt(eTxt.text);}
             buttonOne.onClick = do_seq;
      return pal;
   } //END OF PANEL CREATION
function do_seq(){
    // taken from videocopilot.com sequencer.jsx http://www.videocopilot.net/tutorials/shatterize/
    var curComp = app.project.activeItem;
    if (!curComp || !(curComp instanceof CompItem))
    {
        alert("Please select a Composition.");
        return;
    }
    var offsetFrames = sq_data.len;
    for (var layerId = 0; layerId < curComp.selectedLayers.length; layerId++) 
    {
        var layer = curComp.selectedLayers[layerId];
        layer.startTime = layerId * offsetFrames * curComp.frameDuration;
    }
    // end of sequencer
    }
///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  
   var sequencePal = sequence_buildUI(thisObj);
   if ((sequencePal != null) && (sequencePal instanceof Window)) {
      sequencePal.center();
      sequencePal.show();
      }
   }
   sequence(this);
}
