/**
 * Inset shadow stolen from here
 * https://gist.github.com/kgn/735570
 *
 */jQuery(document).ready(function(e){e("img:not(.typekit-badge)").addClass("inset-shadow");e("img.inset-shadow").each(function(){var t=e(this);t.load(function(){var n=e("<div/>");n.width(t.width());n.height(t.height());n.css("background-image","url("+t.attr("src")+")");n.css("background-size","contain");var r=t.css("display");r==="inline"?n.css("display","inline-block"):n.css("display",r);n.attr("class",t.attr("class"));t.replaceWith(n)})})});