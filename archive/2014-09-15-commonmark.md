---
layout: post
title: "CommonMark"
date: September 15, 2014 at 03:28PM
tags: reference, Markdown
---
##CommonMark
What is Markdown?
Markdown is a plain text format for writing structured documents, based on conventions used for indicating formatting in email and usenet posts. It was developed in 2004 by John Gruber, who wrote the first markdown-to-html converter in Perl, and it soon became widely used in websites. By 2014 there were dozens of implementations in many languages.

Why is a spec needed?
John Gruber’s canonical description of Markdown’s syntax does not specify the syntax unambiguously.

In the absence of a spec, early implementers consulted the original Markdown.pl code to resolve these ambiguities. But Markdown.pl was quite buggy, and gave manifestly bad results in many cases, so it was not a satisfactory replacement for a spec.

Because there is no unambiguous spec, implementations have diverged considerably. As a result, users are often surprised to find that a document that renders one way on one system (say, a GitHub wiki) renders differently on another (say, converting to docbook using Pandoc). To make matters worse, because nothing in Markdown counts as a “syntax error,” the divergence often isn't discovered right away.
[link to source](http://commonmark.org/) 
