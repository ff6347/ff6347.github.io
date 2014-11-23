// main.js
// Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php

$(window).resize(function() {

  jQuery("h1").fitText();

if ($(window).width() <=480) {
$('a#showreellink').attr('rel','');
    }else{
    $('a#showreellink').attr('rel','prettyPhoto[grouped]');
    }

});


jQuery(document).ready(function($){
  jQuery("h1").fitText();

 // $('p').find('a').append(' <i class="icon-hand-right"></i>');
    // }
/**
 * END OF LINK ADDING
 */

/**
 * Add better letterpress to all H1
 */

// $('h1, h2, h3').addClass('depth');
// $('h1, h2, h3').attr('title',function(){
//     return $(this).text();
// });

if ($(window).width() <=480) {

$('a#showreellink').attr('rel','');
    }else{

    $('a#showreellink').attr('rel','prettyPhoto[grouped]');
    }

// $(document.links).filter(function() {
//     return this.hostname !== window.location.hostname;
// }).attr('target', '_blank');
});