---
layout: post
title: |-
  Avería

  The Average Font

  I am not a type designer (Dan Sayers). This is the story of the creation of a new font, Avería: the average of all the fonts on my computer. The field of typography has long fascinated me, and I love playing with creative programming ideas, so it was perhaps inevitable that the idea came to me one day of “generative typography”. A Google on the subject brought up little, and I put the idea to the back of my mind until it occurred to me that perhaps the process of averaging, or interpolating, existing fonts might bring up interesting results. Luckily at this point I didn’t do any more web searching – instead I grabbed my laptop and came up with an initial idea for finding what the average of all my fonts might look like – by overlaying each letter at low opacity. The results can be seen in the below image. This was done by printing each letter of each font, at the same point size, to lots of separate images, and then averaging them – using ImageMagick and PHP. The letters were aligned to the same centre point. I later realised that each font has a ‘baseline’ defined, and an origin on that baseline which each glyph is drawn relative to. The same process, repeated with equal origins, gives slightly different results (see below) – here you can see the baseline is very well-defined, with the glyphs becoming more blurred towards the top right of each.(…)
date: '2011-11-02T18:00:06+01:00'
tags:
- font
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/12245207560/averia-the-average-font-i-am-not-a-type
---
Avería

The Average Font

I am not a type designer (Dan Sayers). This is the story of the creation of a new font, Avería: the average of all the fonts on my computer. The field of typography has long fascinated me, and I love playing with creative programming ideas, so it was perhaps inevitable that the idea came to me one day of “generative typography”. A Google on the subject brought up little, and I put the idea to the back of my mind until it occurred to me that perhaps the process of averaging, or interpolating, existing fonts might bring up interesting results. Luckily at this point I didn’t do any more web searching – instead I grabbed my laptop and came up with an initial idea for finding what the average of all my fonts might look like – by overlaying each letter at low opacity. The results can be seen in the below image. This was done by printing each letter of each font, at the same point size, to lots of separate images, and then averaging them – using ImageMagick and PHP. The letters were aligned to the same centre point. I later realised that each font has a ‘baseline’ defined, and an origin on that baseline which each glyph is drawn relative to. The same process, repeated with equal origins, gives slightly different results (see below) – here you can see the baseline is very well-defined, with the glyphs becoming more blurred towards the top right of each.(…)—Avería – The Average Font
