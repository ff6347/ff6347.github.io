---
layout: post
title: JSON Generator – tool for generating random JSON data
date: '2014-03-12T11:33:50+01:00'
tags:
- IFTTT
- Pinboard
- data
- generator
- javascript
- JSON
tumblr_url: http://fabiantheblind.tumblr.com/post/79350267674/json-generator-tool-for-generating-random-json-data
---
March 05, 2014 at 12:44PM
We’ve all faced the problem of lack of information in our app. All interfaces seem lifeless and empty. Debugging with no data is also not simple.

I think that each of us has at least once in their lives created a bunch of files with JSON data, but they were just one object propagated without unique fields. JSON Generator was created in order to help with this. It provides an opportunity generate any data and in any quantity. Edit template, click “Generate” and you’re done.

Usage

JSON Generator has a convenient syntax. You can specify JavaScript object for template that you see in the left box. It will be cloned in infinite depth. Fields may have any name and value, but it must be valid JavaScript. Values, which are strings, may contain one or more template tags. When you click “Generate” the data source object to be copied several times and the place of tags will be inserted random values.

You can copy the generated JSON to clipboard by clicking “Copy to clipboard”. If you click “Upload”, JSON will be stored on the server and you can download generated file by clicking “Download” button or access it via ajax-request by URL that will be copied to clipboard after clicking “Copy URL” button. Yes, JSON Generator can JSONP :) Generated files are stored 30 days and their size does not exceed 500 kB. Size appears at the top right of the field with the generated data. If file size text is red - file is too large for saving on server, but you can copy it to your clipboard and save locally to *.json file.

You can choose indentation for the generated JSON from the drop-down list. Also when you copy the link to uploaded code there is an “indent” param in URL. It can has values of 2, 3 and 4. If param is not specified code will be compact.

JSON Generator remembers your last template in localStorage. If you want to reset it, click “Reset” button to reset template and UI.

If you have found a bug, you have a suggestion for improving the application or just want to thank me, click on “Feedback”.http://ift.tt/15kcSCY
