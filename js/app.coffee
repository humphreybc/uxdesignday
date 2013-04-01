animating = false
linkOffsets = []

$(document).ready ->
  console.log 'Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday'

  $('#header a').click ->
    animating = true
    $('html, body').animate
      scrollTop: ($($(this).attr('href')).offset().top) - 100
    , 500, ->
      checkOffset $(window).scrollTop()
      animating = false;
    false

$(window).load ->
  if document.body.clientWidth > 600
    navLinks = $('#nav-links li a')
    for item in navLinks
      link = $(item).attr('href')
      # ~~ forces integer context so we don't accidentally subtract in string context
      linkOffsets.push([link, if typeof $(link).offset() is 'undefined' then null else ~~$(link).offset().top - 100])
    linkOffsets.reverse() # Going bottom up so we catch the active link furthest down the page

    checkOffset $(window).scrollTop()

    timeout = null
    $(window).scroll ->
      scrollTop = $(this).scrollTop();
      if !timeout && !animating
        timeout = setTimeout ->
          timeout = null
          checkOffset scrollTop
        , 150

checkOffset = (scrollTop) ->
    breakLoop = false;
    for link in linkOffsets
      return if link[1] is null
      if scrollTop + 10 > link[1]
        activeLink = $('a[href="' + link[0] + '"]')
        unless activeLink.hasClass 'active'
          $('a.active').removeClass 'active'
          activeLink.addClass 'active'
        breakLoop = true
      break if breakLoop