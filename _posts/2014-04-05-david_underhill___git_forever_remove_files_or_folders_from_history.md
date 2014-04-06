---
layout: post
title: David Underhill » git forever remove files or folders from history
date: April 05, 2014 at 10:28AM
tags: git, history, remove
---
##David Underhill » git: forever remove files or folders from history
&gt; I recently had a need to rewrite a git repository’s history. This isn’t generally a very good idea, though it is useful if your repository contains files it should not (such as unneeded large binary files or copyrighted material). I also am using it because I had a branch where I only wanted to merge a subset of files back into master (though there are probably better ways of doing this). Anyway, it is not very hard to rewrite history thanks to the excellent git-filter-branch tool which comes with git. However, if your goal was to reduce a large repository’s size then git-filter-branch does not quite finish the job since it makes temporary backups of the filtered out files. To remove those, you need to do a little more work. To make it easier to permanently remove files, I wrapped it in a little bash script git-remove-history (also shown below) — simply go to the root of your repository and run the script with the list of files you want to delete and it will do the rest. There is an interesting thread about doing this here on KernelTrap.
[link to source](http://ift.tt/rnwLHC) 
