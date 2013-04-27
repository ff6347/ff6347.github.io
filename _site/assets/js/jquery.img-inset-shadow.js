/**
 * Inset shadow stolen from here
 * https://gist.github.com/kgn/735570
 *
 */


jQuery(document).ready(function($){
    $('img:not(#logo, .wp-biographia-avatar,#buffer, .carousel-images, .two-column-images)').addClass('inset-shadow');
    $('img.inset-shadow').each(function(){
        var $img = $(this);
        $img.load(function(){
            var $div = $('<div/>');
            $div.width($img.width());
            $div.height($img.height());
            $div.css('background-image', 'url('+$img.attr('src')+')');
            $div.css('background-size','contain');
            var display = $img.css('display');
            //If the div is set to inline the width and height will be 0 :(
            //inline-block appears to be the only way around it but it's not
            //supported in all browsers :( The browsers it's not supported in
            //are probably the same ones that don't support box-shadow,
            //so a solution maybe to add a browser check.
            if(display === 'inline'){
                $div.css('display', 'inline-block');
            }else{
                $div.css('display', display);
            }
            $div.attr('class', $img.attr('class'));
            $img.replaceWith($div);
        });
    });


});