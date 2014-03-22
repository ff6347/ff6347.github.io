---
layout: post
title: normal-map (ruby)
date: '2012-12-28T16:17:18+01:00'
tags:
- code
- imagemagick
- rmagick
- ruby
tumblr_url: http://fabiantheblind.tumblr.com/post/39041323358/normal-map-ruby
---

  Command line tool and Ruby library for generating normal maps.
  Generates DOT3 bump maps, also known as normal maps, for use in 3D computing.
  by sinisterchipmunk
  Works fine! Cool thing.github Link


needs rmagick which needs ImageMagick:

sudo port install ImageMagick  


than

sudo gem install rmagick  


if the installation of ImageMagick fails it helped for me to fully uninstall zlib and jpeg using:

# clean out zlib  
port clean --all zlib  
sudo port clean --all zlib  
sudo port install zlib  

# clean out jpeg
port clean --all jpeg  
sudo port clean --all jpeg  
sudo port install jpeg
