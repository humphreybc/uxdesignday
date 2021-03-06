'use strict';

var animating = false;
var linkOffsets = [];
var currentPosition = 0;

$(document).ready(function() {
  console.log('Version 2.1');
  console.log('Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/uxdesignday');

  // Tooltips
  // Only works if the window size is wider than 600px
  if (document.body.clientWidth > 600) {
    $('[rel=tooltip]').tooltip({
      placement: 'bottom',
      delay: {
        show: 500,
        hide: 250
      }
    });
  }

  // Site banner at the top of the page
  // Chooses a random banner from three possible choices
  // Fades the image in on page load

  var randbanner = Math.floor(Math.random() * 4) + 1;

  $('#banner').animate({
    opacity: 0
  }, 0).css({
    'background-image': 'url("../img/banner' + randbanner + '.jpg")'
  }).animate({
    opacity: 1
  }, 1000);

  // Resource roulette
  // Randomly chooses a link from the list in the HTML

  $('#resource-roulette').click(function(e) {
    var resourceLinks;
    e.preventDefault();
    resourceLinks = $('.resources a').get();
    window.open(resourceLinks[Math.floor(Math.random() * resourceLinks.length)].getAttribute('href'), '_blank');
  });

  // Speaker bio modals
  // Code to construct modal from HTML data, show it on click, and then destroy it on close

  // modalShow()
  // Finds the data from the HTML, constructs it with modalCreate(), and shows it
  var modalShow = function(bioName) {
    var bioInfo = bios[bioName];
    var name = bioInfo.name;
    var title = bioInfo.title;
    var bio = bioInfo.bio;
    var url = bioName;

    history.pushState('', document.title, window.location.pathname + '#' + url);

    currentPosition = $(window).scrollTop();

    setTimeout(function() {
      $('body').addClass('modal-open');
    }, 500);

    modalCreate(name, title, bio);
    $('.modal-overlay').show();
  };

  // modalCreate()
  // Constructs a modal with the appropriate HTML markup
  var modalCreate = function(name, title, bio) {
    $('body').append(
        '<div class="modal-overlay fadeIn animated-quick"> \
            <div class="modal-content fadeInDownBig animated-quick"> \
              <div class="modal-inner"> \
                <div class="modal-close"></div> \
                <h2>' + name + '</h2> \
                <p style="margin-top:0px;"><i>' + title + '</i></p> \
                <p>' + bio + '</p> \
              </div> \
            </div> \
          </div>');
  };

  // modalHide()
  // Destroys the modal

  var modalHide = function() {
    history.pushState('', document.title, window.location.pathname);
    $('body').removeClass('modal-open');

    $(window).scrollTop(currentPosition);

    $('.modal-overlay').removeClass('fadeIn');
    $('.modal-overlay').addClass('fadeOut');

    setTimeout(function() {
      $('.modal-overlay').remove();
    }, 500);
  };

  // Clicking something with .box-speaker runs modalShow()

  $('.box-speaker').click(function(e) {
    var trigger;
    e.preventDefault();
    trigger = e.currentTarget;
    modalShow($(trigger).data('name'));
  });

  // Closing the modal by clicking the X

  $(document).on('click', '.modal-close', function(e) {
    e.preventDefault();
    modalHide();
  });

  // Closing the modal by hitting the ESC key

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      modalHide();
    }
  });

  // Check to see if there's a hash to show speaker bio

  if(window.location.hash) {
    var hash = (window.location.hash).replace('#', '');
    var navItems = ['get-tickets', 'speakers', 'sponsors', 'education'];

    if ($.inArray(hash, navItems) === -1) {
      modalShow(hash);
    }
  }

  // Google Analytics event tracking

  $('#ticket-button-top').on('click', function() {
    ga('send', 'event', 'button', 'click', 'ticket-button-top');
  });

  $('#ticket-button-bottom').on('click', function() {
    ga('send', 'event', 'button', 'click', 'ticket-button-bottom');
  });

  // Main navigation
  // See functions below

  $('nav a').click(function() {
    animating = true;

    var offset = $('body').scrollTop();
    var $anchor = $($(this).attr('href'));
    var anchorPosition = ($anchor.offset().top);

    $('html, body').animate({
      scrollTop: anchorPosition
    }, 500, function() {
      checkOffset($(window).scrollTop());
      return animating = false;
    });
    return false;

  });

});

// Code to calculate scroll positions for navigation
// Only runs when the screen is wider than 600px
if (document.body.clientWidth > 600) {

  $(window).load(function() {
    var navLinks = $('#nav-links').find('li a');
    for (var i = 0, len = navLinks.length; i < len; i++) {
      var item = navLinks[i];
      var link = $(item).attr('href');
      // ~~ forces integer context so we don't accidentally subtract in string context
      linkOffsets.push([link, typeof $(link).offset() === 'undefined' ? null : ~~$(link).offset().top]);
    }
    // Going bottom up so we catch the active link furthest down the page
    linkOffsets.reverse();

    checkOffset($(window).scrollTop());

    var timeout = null;
    return $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(this).scrollTop();
      if (!timeout && !animating) {
        return timeout = setTimeout(function() {
          timeout = null;
          return checkOffset(scrollTop);
        }, 200);
      }
    });
  });

  // How many pixels above a section before the navigation changes
  var offsetBuffer = 50;

  var checkOffset = function(scrollTop) {
    for (var i = 0, len = linkOffsets.length; i < len; i++) {
      var link = linkOffsets[i];
      if (link[1] === null) {
        return;
      } else if (scrollTop + offsetBuffer < link[link.length - 1]) {
        $('a.active').removeClass('active');
      } else if (scrollTop + offsetBuffer > link[1]) {
        var activeLink = $('a[href="' + link[0] + '"]');
        if (!activeLink.hasClass('active')) {
          $('a.active').removeClass('active');
          activeLink.addClass('active');
        }
        break;
      }
    }
  };
}
