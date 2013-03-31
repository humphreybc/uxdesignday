(function() {

  $(document).ready(function() {
    var checkOffset, item, link, linkOffsets, navLinks, timeout, _i, _len;
    console.log('Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday');
    $('#nav-links li a').click(function() {
      $('html, body').animate({
        scrollTop: ($($(this).attr('href')).offset().top) - 100
      }, 500);
      return false;
    });
    linkOffsets = [];
    navLinks = $('#nav-links li a');
    for (_i = 0, _len = navLinks.length; _i < _len; _i++) {
      item = navLinks[_i];
      link = $(item).attr('href');
      linkOffsets.push([link, typeof $(link).offset() === 'undefined' ? null : ~~$(link).offset().top - 100]);
    }
    checkOffset = function(scrollTop) {
      var activeLink, _j, _len1;
      for (_j = 0, _len1 = linkOffsets.length; _j < _len1; _j++) {
        link = linkOffsets[_j];
        if (link[1] === null) {
          return;
        }
        if (scrollTop > link[1]) {
          activeLink = $('a[href="' + link[0] + '"]');
          if (!activeLink.hasClass('active')) {
            $('a.active').removeClass('active');
            activeLink.addClass('active');
          }
        }
      }
    };
    checkOffset($(window).scrollTop());
    timeout = null;
    return $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(this).scrollTop();
      if (!timeout) {
        return timeout = setTimeout(function() {
          timeout = null;
          return checkOffset(scrollTop);
        }, 250);
      }
    });
  });

}).call(this);
