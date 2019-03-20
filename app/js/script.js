/*
Created by Caleb Marcoux (Uncle Snail)
I solute you, my fellow programmer.
*/

toTop = function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

removeWidth = function () {
  $("p").removeAttr('style');
}

toNext = function (next) {
  document.querySelector(next).scrollIntoView({
    behavior: 'smooth'
  });
};

//For "sticky" header;

var navBar;
var startPos;
var startWidth;
var yPos;

window.onload = function() {
  navBar = document.getElementById('nav');
  startPos = nav.offsetTop;
  startWidth = nav.offsetWidth;
  /*Fix centering issues*/
  nav.style.width = startWidth + 'px';
  if (yPos >= startPos){
    nav.style.position = 'fixed';
  }

}

window.onresize = function() {
  /*get appropriate window size
  by setting back to correct size
  for new window, then changing
  to sticky again.*/
  nav.style.position = 'relative';
  nav.style.width = '100%';
  startWidth = nav.offsetWidth;
  nav.style.width = startWidth + 'px';
  if (yPos >= startPos){
    nav.style.position = 'fixed';
  }
}

window.onscroll = function() {
  yPos = window.pageYOffset;
  if (yPos >= startPos) {
    nav.style.position = 'fixed';
  }
  if (yPos < startPos) {
    nav.style.position = 'relative';
  }
  nav.style.width = startWidth + 'px';
}

$(document).ready(function(){
  $(".shepherd").click(function(){
    $(this).html('<iframe src="https://www.khanacademy.org/computer-programming/planet-explorer/5870857777250304/embedded?id=1553046571320-0.8628710634770087&origin=http%3A%2F%2Fwww.calebmarcoux.com&author=yes&height=600px&buttons=yes&width=600px&editor=yes&embed=yes" style="border: 0px none; width: 1140px; height: 667px;" scrolling="no" frameborder="0">#document<!DOCTYPE html><html class="embed to-top" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" lang="en" style=""></html></iframe>');
    //$(this).html('hello');
    $("html").css("width", "");
  });
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

  //document.getElementById("shepherd").innerHTML = '<iframe src="https://www.khanacademy.org/computer-programming/planet-explorer/5870857777250304/embedded?id=1553046571320-0.8628710634770087&origin=http%3A%2F%2Fwww.calebmarcoux.com&author=yes&height=600px&buttons=yes&width=600px&editor=yes&embed=yes" style="border: 0px none; width: 1140px; height: 667px;" scrolling="no" frameborder="0">#document<!DOCTYPE html><html class="embed to-top" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml" lang="en" style=""></html></iframe>'

  $('.to-top').click(toTop);
  $("button").click(function () {
    $("*").removeAttr("style");
  });
  $("html").css("width", "");
});
