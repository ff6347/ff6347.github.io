---
layout: post
title: "Inspecting video files with ffprobe (part of ffmpeg)  "
date: 2013-01-31T15:08:00+01:00
tags:
- code
- terminal
- ffmpeg
- ffprobe
- macports
tumblr_url: http://fabiantheblind.tumblr.com/post/41944019609/inspecting-video-files-with-ffprobe-part-of-ffmpeg
---
Today I needed to inspect a video file. So I thought: “Do it with ffmpeg!”. I had a older version of ffmpeg installed via macports. So this is the process i went through. gist

If you don’t have it already:
1. Install XCode and the XCode command-line tools
2. Update or install ffmpeg using macports

# This updates the ports tree
sudo port selfupdate  

# This checks if you have ffmpeg installed via macports  
port search ffmepg  

# you can check for outdated ports  
port outdated  

# If you have it installed and it is outdated update all outdated ports
sudo port upgrade outdated  

# If you only want to upgrade ffmpeg
sudo port upgrade ffmpeg

# If it is not installed do it  
# sudo port install ffmpeg +gpl +lame +x264 +xvid  


Now inspect a file using ffprobe (comes bundled with ffmpeg)

# This redirects the ffprobe help to a file
ffprobe -h \&gt; ffprobe_help.txt

# This creates a report next to your file  
ffprobe -report SOMEFILE.mp4  

# This creates your report as .json file next to your file
ffprobe -v quiet -print_format json -show_format -show_streams SOMEFILE.mp4 &gt; ffprobe.json


Sources:

XCode  
stackoverflow : xcode 4.4 command line tools  
Macports Guide  
Hay Kranen howto install and use ffmpeg on mac os x leopard  
stackoverflow : get ffmpeg information in friendly way  
ffmpeg Documentation  
ffprobe Documentation  
Peteris Krumins Bash One-Liners Explained, Part III: All about redirections
