# I decided since this is a learning project, that I would use several different methods of writing JS.
# This is my first attempt at CoffeeScript.
# Created by Caleb Marcoux
# This file contains the functions to reset the wind positions and animation times/speeds for the wind effect.

inView = (element) ->
  viewTop = $(document).scrollTop()
  viewBottom = viewTop + $(window).height()
  elementTop = element.offset().top
  elementBottom = elementTop + element.height()
  viewBottom > elementTop and viewTop < elementBottom

$(document).ready(() ->
  # Populate wind streaks
  windWidth = 300
  windHeight = 200
  windStreakAmount = 5
  for i in [1..windStreakAmount] by 1
    $('svg#wind-container').append("<line class=\"wind queued\"
      x1=\"0\" y1=\"#{windHeight/windStreakAmount*i}\"
      x2=\"#{windWidth}\" y2=\"#{windHeight/windStreakAmount*i}\"
      style=\"stroke: white;stroke-width:2;animation-delay:#{Math.random()*2-1}s\"/>")
  $('svg#wind-container').html($('svg#wind-container').html()) # Refresh the svg on the screen so that it appears.

  $('#wind-container line.wind').on('webkitAnimationIteration animationiteration', () ->
    line = $(this)
    yposition = Math.random()*200
    line.attr({
      x1 : "#{0}",
      y1 : "#{yposition}",
      x2 : "#{300}",
      y2 : "#{yposition}",
      })
    return).removeClass("queued")

  $(document).scroll(() ->
    if inView($('#wind-container'))
      yposition = Math.random()*100
      $('#wind-container line.wind.queued').css("animation-iteration-count", "infinite").removeClass("queued")
      # Use a queued class to only select elements that do not already have a handler attached.
    else
      $('#wind-container > line').css("animation-iteration-count", "1").addClass("queued")
    return)
  return)
