---
layout: standard
title: blog
---

{% for post in site.posts %}
## [{{post.title}}]({{post.url}})  

**{{post.date | date: '%B %d, %Y'}}**  
> {{ post.content | strip_html | truncatewords:25 }}
{% if post.excerpt != post.content %}> [Read more]({{ site.baseurl }}{{ post.url }})
{% endif %}  

---

{% endfor %}