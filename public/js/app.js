(function() {
  var animating, checkOffset, linkOffsets;

  animating = false;

  linkOffsets = [];

  $(document).ready(function() {
    var randbanner, s;
    console.log('Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday');
    if (document.body.clientWidth > 600) {
      s = skrollr.init({
        forceHeight: false
      });
      $('[rel=tooltip]').tooltip({
        placement: 'bottom',
        delay: {
          show: 500,
          hide: 250
        }
      });
    }
    $('nav a').click(function() {
      animating = true;
      $('html, body').animate({
        scrollTop: ($($(this).attr('href')).offset().top)
      }, 500, function() {
        checkOffset($(window).scrollTop());
        return animating = false;
      });
      return false;
    });
    $('#resource-roulette').click(function(e) {
      var resourceLinks;
      e.preventDefault();
      resourceLinks = $('.resources a').get();
      return window.open(resourceLinks[Math.floor(Math.random() * resourceLinks.length)].getAttribute('href'), '_blank');
    });
    randbanner = Math.floor(Math.random() * 4) + 1;
    return $('#banner').css('background-image', 'url("../img/banner' + randbanner + '.jpg")');
  });

  if (document.body.clientWidth > 600) {
    $(window).load(function() {
      var item, link, navLinks, timeout, _i, _len;
      navLinks = $('#nav-links li a');
      for (_i = 0, _len = navLinks.length; _i < _len; _i++) {
        item = navLinks[_i];
        link = $(item).attr('href');
        linkOffsets.push([link, typeof $(link).offset() === 'undefined' ? null : ~~$(link).offset().top - 100]);
      }
      linkOffsets.reverse();
      checkOffset($(window).scrollTop());
      timeout = null;
      return $(window).scroll(function() {
        var scrollTop;
        scrollTop = $(this).scrollTop();
        if (!timeout && !animating) {
          return timeout = setTimeout(function() {
            timeout = null;
            return checkOffset(scrollTop);
          }, 100);
        }
      });
    });
    checkOffset = function(scrollTop) {
      var activeLink, link, _i, _len;
      for (_i = 0, _len = linkOffsets.length; _i < _len; _i++) {
        link = linkOffsets[_i];
        if (link[1] === null) {
          return;
        }
        if (scrollTop + 10 > link[1]) {
          activeLink = $('a[href="' + link[0] + '"]');
          if (!activeLink.hasClass('active')) {
            $('a.active').removeClass('active');
            activeLink.addClass('active');
          }
          break;
        }
      }
    };
  }

}).call(this);
