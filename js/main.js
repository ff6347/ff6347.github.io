/* global window document $ */

/*
  Slidemenu
*/

window.onload = function() {
  (function() {
    var $body = document.body;
    var $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

    if (typeof $menu_trigger !== 'undefined') {
      $menu_trigger.addEventListener('click', function() {
        $body.className = ($body.className === 'menu-active') ? '' : 'menu-active';
      });
    }

  }).call(this);
};


$(document).ready(function() {
  // console.log('ready');
  // $('iframe').reframe();
});
