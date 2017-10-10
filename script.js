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
