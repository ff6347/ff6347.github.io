---
layout: post
title: Map Projection Transitions
date: '2014-03-14T21:44:36+01:00'
tags:
- IFTTT
- Pinboard
- animation
- geo
- maps
- D3
tumblr_url: http://fabiantheblind.tumblr.com/post/79582818555/map-projection-transitions
---
March 10, 2014 at 12:13PM
By default, d3.geo will cut lines and polygons where they cross the antimeridian. This is usually appropriate for conic and cylindrical projections.

Projections with the same type of clipping are simple to transition using a weighted average of the source and target projections.

Based on Projection Transitions by Mike Bostock.http://ift.tt/19exID0
