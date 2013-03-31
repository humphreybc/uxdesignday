$(document).ready ->
  console.log 'Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday'

  $('#header a').click ->
    $('html, body').animate
      scrollTop: ($($(this).attr('href')).offset().top) - 100
    , 500
    false

  linkOffsets = []
  navLinks = $('#nav-links li a')
  for item in navLinks
    link = $(item).attr('href')
    # ~~ forces integer context so we don't accidentally subtract in string context
    linkOffsets.push([link, if typeof $(link).offset() is 'undefined' then null else ~~$(link).offset().top - 100])

  checkOffset = (scrollTop) ->
    for link in linkOffsets
      return if link[1] is null
      if scrollTop > link[1]
        activeLink = $('a[href="' + link[0] + '"]')
        unless activeLink.hasClass 'active'
          $('a.active').removeClass 'active'
          activeLink.addClass 'active'

  checkOffset $(window).scrollTop()

  timeout = null
  $(window).scroll ->
    scrollTop = $(this).scrollTop();
    if !timeout
      timeout = setTimeout ->
        timeout = null
        checkOffset scrollTop
      , 250
