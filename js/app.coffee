$(document).ready ->
  console.log 'Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday'

  $('#nav-links li a').click ->
    $('html, body').animate
      scrollTop: ($($(this).attr('href')).offset().top) - 100
    , 500
    false