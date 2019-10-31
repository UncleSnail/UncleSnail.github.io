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
