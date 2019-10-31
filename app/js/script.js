/*
  Created by Caleb Marcoux (Uncle Snail)
  I solute you, my fellow programmer.
*/

$(document).ready(function(){
  $('.carousel-pages').slick({
    // Prevent key stealing from P5.JS
    accessibility: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots: true,
    adaptiveHeight: true
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
  $('.carousel-pages').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    window.frames[currentSlide].noLoop();
    window.frames[nextSlide].loop();
    console.log(currentSlide);
    console.log(nextSlide);
  });
  $('.carousel-pages .carousel-page:first-child').mouseenter(function() {
    window.frames[0].loop();
    console.log("mouseover");
  });
});
