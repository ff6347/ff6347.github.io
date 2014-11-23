#!/bin/sh

clear

printf "layout (default: 'post'): "
read layout
: ${layout:="post"}

printf "date (default: Y-m-d): "
read date
: ${date:=$(date +"%Y-%m-%d")}

printf "title (default: 'untitled'): "
read title
: ${title:="untitled"}

printf "category: "
read category

printf "published (default: 'false'): "
read published
: ${published:="true"}

echo "---
layout: $layout
title: $title
category: $category
published: $published
---


" > "_drafts/"$date"-"$title".md"

subl  "_drafts/"$date"-"$title".md"

