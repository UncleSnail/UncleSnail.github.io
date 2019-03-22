# I decided since this is a learning project, that I would use several different methods of writing JS.
# This is my first attempt at CoffeeScript.
# Created by Caleb Marcoux
# This file contains the functions to reset the wind positions and animation times/speeds for the wind effect.

inView (element) ->
  viewTop = $(document).scrollTop()
  viewBottom = viewTop + $(window).height()
  elementTop = element.offset().top
  elementBottom = elementTop + element.height()
  viewBottom > elementTop and viewTop < elementBottom

$(document).ready(() ->
  windContainer = $('#wind-container')
  $(document).scroll(() ->
    if inView(windContainer)
      $('#wind-container > line').on('webkitAnimationEnd animationend', () ->
        line = $('.wind')
        length = line.getTotalLength()
        line.css(
          {
            "stroke" : "yellow",
            "stroke-dasharray" : "#{length} #{length}"
            "stroke-dashoffset" : "#{length}"
          });
        null)
    else
      $('#wind-container > line').off()
    null)
  null)
