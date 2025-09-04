---
title: "til: JS Array.push returns new length"
pubDate: 2025-06-19
tags: [javascript, programming, til]
categories: [programming]
published: true
description: "Today I learned that Array.push returns the new length of the array."
---

I never thought about what this might return nor that it even should return something. Today I learned that it is the new length of the array. So the code below return `1`.

```js
console.log([].push(4));
```

Good to know.
