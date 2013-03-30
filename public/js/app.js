(function() {

  $(document).ready(function() {
    console.log('Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday');
    return $('#nav-links li a').click(function() {
      $('html, body').animate({
        scrollTop: ($($(this).attr('href')).offset().top) - 100
      }, 500);
      return false;
    });
  });

}).call(this);
