/* global window document */

/*
  Slidemenu
*/

window.onload = function() {
  window.fitText(document.getElementById('fit'));

  var images = ['avatar-0.JPG', 'avatar-1.JPG', 'avatar-2.JPG', 'avatar-3.JPG',
  'avatar-4.JPG', 'avatar-5.JPG', 'avatar-6.JPG', 'avatar-7.JPG', 'avatar-8.JPG',
  'avatar-9.JPG', 'avatar-10.JPG', 'avatar-11.JPG', 'avatar-12.JPG', 'avatar-13.JPG',
  'avatar-14.JPG', 'avatar-15.JPG', 'avatar-16.JPG', 'avatar-17.JPG', 'avatar-18.JPG',
  'avatar-19.JPG', 'avatar-20.JPG', 'avatar-21.JPG', 'avatar-22.JPG', 'avatar-23.JPG',
  'avatar-24.JPG', 'avatar-25.JPG', 'avatar-26.JPG', 'avatar-27.JPG', 'avatar-28.JPG',
  'avatar-29.JPG', 'avatar-30.JPG', 'avatar-31.JPG', 'avatar-32.JPG', 'avatar-33.JPG',
  'avatar-34.JPG'];

  var selector = Math.floor(Math.random() * images.length);
  document.getElementById('avatar').src = './images/' + images[selector];
};
