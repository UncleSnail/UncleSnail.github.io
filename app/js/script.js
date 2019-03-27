/*
Created by Caleb Marcoux (Uncle Snail)
I solute you, my fellow programmer.
*/

//<script src="https://www.khanacademy.org/computer-programming/bird-bait-16/4568063333629952/embed.js?editor=yes&buttons=yes&author=yes&embed=yes&width=400px&height=400px"></script>

$(document).ready(function(){
  $('.carousel-pages').slick({
    lazyLoad: 'ondemand',
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
  $('.carousel-nav').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(currentSlide);
    console.log(nextSlide);
  });
});
