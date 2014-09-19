animating = false
linkOffsets = []

$(document).ready ->
  console.log 'Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday'

  $('nav a').click ->
    animating = true
    $('html, body').animate
      scrollTop: ($($(this).attr('href')).offset().top)
    , 500, ->
      checkOffset $(window).scrollTop()
      animating = false
    false

  $('#resource-roulette').click (e) ->
    e.preventDefault()
    resourceLinks = $('.resources a').get()
    window.open resourceLinks[Math.floor(Math.random() * resourceLinks.length)].getAttribute('href'), '_blank'

  randbanner = Math.floor(Math.random() * 4) + 1

  $('#banner').animate(
    opacity: 0
  , 0).css('background-image': 'url("../img/banner' + randbanner + '.jpg")').animate
    opacity: 1
  , 1000

  $('#max-bio-trigger').click (e) ->
    e.preventDefault()
    $('#max-bio').show()

  $('.bio-modal-close').click (e) ->
    bioFadeOut()

  $(document).keyup (e) ->
    if e.keyCode is 27
      bioFadeOut()

  bioFadeOut = () ->
    $('.bio-overlay').hide()

if document.body.clientWidth > 600
  $(window).load ->
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
        , 100

  checkOffset = (scrollTop) ->
    for link in linkOffsets
      return if link[1] is null
      if scrollTop + 10 > link[1]
        activeLink = $('a[href="' + link[0] + '"]')
        unless activeLink.hasClass 'active'
          $('a.active').removeClass 'active'
          activeLink.addClass 'active'
        break
