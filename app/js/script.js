/*
Created by Caleb Marcoux (Uncle Snail)
I solute you, my fellow programmer.
*/

//<script src="https://www.khanacademy.org/computer-programming/bird-bait-16/4568063333629952/embed.js?editor=yes&buttons=yes&author=yes&embed=yes&width=400px&height=400px"></script>

$(document).ready(function(){
  $('.carousel-pages').slick({
    // Prevent key stealing from P5.JS
    accessibility: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.carousel-nav',
    adaptiveHeight: true
  });
  $('.carousel-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.carousel-pages',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });
  $('.code').each(function() {
    var file = $(this).attr("data-src");
    var element = $(this);
    $.ajax({
      url: file,
      dataType: 'text',
      success: function(data) {
        element.text(data);
      }
    });
  });
  //Only load the code prettifier after the content is read.
  prettify = document.createElement("script");
  prettify.src = "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js";
  $('head').append(prettify);
  lineNumbers = document.createElement("style");
  lineNumbers.innerHTML = '.linenums li {list-style-type: decimal;background: #fff;}ol.linenums {padding-left: 57px;}pre{white-space: pre-wrap;}';
  //Appended to the body so that it is after the style automattically appended by prettify.
  $('body').append(lineNumbers);
});

$(window).on("load", function() {
  // Use -1 because the first slide is not an app wrapper.
  $('.carousel-nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if (currentSlide != 0) {
      window.frames[currentSlide-1].noLoop();
    }
    if (nextSlide != 0) {
      window.frames[nextSlide-1].loop();
    }
    console.log(currentSlide);
    console.log(nextSlide);
  });
});
