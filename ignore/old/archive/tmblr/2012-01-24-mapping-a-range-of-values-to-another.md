---
layout: post
title: "Mapping a range of values to another"
date: 2012-01-24T17:48:19+01:00
tags: []
tumblr_url: http://fabiantheblind.tumblr.com/post/16413883984/mapping-a-range-of-values-to-another
---
Thnx world wide world of webs

what would i do without you…

//~ found here
//~ http://stackoverflow.com/questions/6984763/map-one-range-of-values-to-another-in-vbscript
//~ y = ((x - a1)/(a2 - a1)) * (b2 - b1) + b1

var res = map_value (10, -100, 100, -1000, 1000);

$.writeln (res);

function map_value(value,value_left,value_right,result_left,result_right){

var source_left = value_left;// a1
var source_right = value_right;//a2

var target_left = result_left;//b1
var tagret_right = result_right;//b2

var source = value;//x
var target = null;//y

target = ((source - source_left)/(source_right - source_left)) * (tagret_right - target_left) + target_left;

return target;
}
