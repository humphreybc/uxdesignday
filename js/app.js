var animating, checkOffset, linkOffsets;

animating = false;
linkOffsets = [];

$(document).ready(function() {
  var modalHide, modalShow, randbanner, s;
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

  randbanner = Math.floor(Math.random() * 4) + 1;

  $('#banner').animate({
    opacity: 0
  }, 0).css({
    'background-image': 'url("../img/banner' + randbanner + '.jpg")'
  }).animate({
    opacity: 1
  }, 1000);

  // Main navigation
  // See functions below

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

  // Resource roulette
  // Randomly chooses a link from the list in the HTML

  $('#resource-roulette').click(function(e) {
    var resourceLinks;
    e.preventDefault();
    resourceLinks = $('.resources a').get();
    window.open(resourceLinks[Math.floor(Math.random() * resourceLinks.length)].getAttribute('href'), '_blank');
  });

  // Speaker bios
  // Code to construct modal from HTML data, show it on click, and then destroy it on close

  // modalShow()
  // Finds the data from the HTML, constructs it with modalCreate(), and shows it

  modalShow = function(trigger) {
    var data, name, title, bio;

    console.log (trigger);

    data = $(trigger).closest('.box-speaker').find('.bio');
    name = data.find('.name').text();
    title = data.find('.title').text();
    bio = data.find('.bio-desc').html();

    url = name.replace(/\s/g, '');
    console.log (url);
    window.location.hash = url;
    
    modalCreate(name, title, bio);
    $('.bio-overlay').show();
  };

  // modalCreate()
  // Constructs a modal with the appropriate HTML markup

  modalCreate = function(name, title, bio) {
    $('.site').append(
        '<div class="bio-overlay"> \
            <div class="bio-modal"> \
              <div class="bio-modal-inner"> \
                <div class="bio-modal-close"></div> \
                <h2>' + name + '</h2> \
                <p style="margin-top:0px;"><i>' + title + '</i></p> \
                <p>' + bio + '</p> \
              </div> \
            </div> \
          </div>')
  };

  // modalHide()
  // Destroys the modal

  modalHide = function() {
    history.pushState("", document.title, window.location.pathname);
    $('.bio-overlay').remove();
  };

  // Clicking something with .modal-trigger runs modalShow()

  $('.modal-trigger').click(function(e) {
    var trigger;
    e.preventDefault();
    trigger = e.currentTarget;
    modalShow(trigger);
  });

  // Closing the modal by clicking the X

  $(document).on('click', '.bio-modal-close', function(e) {
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
    hash = window.location.hash;
    console.log ('Hash exists!');
  } else {
    // Fragment doesn't exist
  };

  // Google Analytics event tracking

  $('#ticket-button-top').on('click', function() {
    ga('send', 'event', 'button', 'click', 'ticket-button-top');
  });

  $('#ticket-button-bottom').on('click', function() {
    ga('send', 'event', 'button', 'click', 'ticket-button-bottom');
  });

});

// Code to calculate scroll positions for navigation
// Only runs when the screen is wider than 600px

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
