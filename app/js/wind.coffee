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

  line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
  line.style.strokeWidth = "2px"
  $('#wind-container').appendChild(line)
  # $('#wind-container').append("""<line class="wind queued" x1="0" y1="100" x2="300" y2="100" style="stroke: white;stroke-width:2"/>""")

  $('#wind-container line.wind').on('webkitAnimationIteration animationiteration', () ->
    line = $(this)
    yposition = Math.random()*200
    line.attr({
      x1 : "#{0}",
      y1 : "#{yposition}",
      x2 : "#{300}",
      y2 : "#{yposition}",
      })
    length = line.getTotalLength()
    line.css(
      {
        "stroke" : "yellow",
        "stroke-dasharray" : "#{length} #{length}"
        "stroke-dashoffset" : "#{length}"
      });
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
