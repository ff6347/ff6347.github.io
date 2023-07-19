---
layout: ../../layouts/post.astro
title: "Rename a GitHub Repo with a Linked Netlify Project"
pubDate: 2020-08-05
tags: [github, netlify]
categories: [tech]
published: true
---

# Rename a GitHub Repo with a Linked Netlify Project

So what needs to be done before you do that ⤴?

1. stop all builds
2. disable auto deploys on Netlify
3. rename the repo on GitHub
4. relink the repo on Netlify (should trigger a build)
5. your environment variables might be gone - set them again

**!Bonus Tip:** Don't set `NODE_ENV` on `netlify.toml`. Or your `devDepndencies` wont be installed. (:facepalm:)
