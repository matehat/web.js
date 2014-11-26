if (!Date.now) {
  Date.now = function() {
    return +(new Date());
  };
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      var kValue;
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(function () {
  var transitionTime = 0;
  var $body = $('body');
  var $main = $('#main, #faq-main');
  var $whoWeAre = $('#who-we-are');
  var $nav = $('nav');
  var $window = $(window);
  var $faqTitle = $("#top-faq h2");
  var $faqBg = $("#faq .bg");
  var $topIcon = $("#top-icon");
  
  var temp = ["mai", "l", "to"];

  if ($faqTitle.length) {
    var faqTitleMaxScroll = $main.position().top / 2;
    var lastScroll;
    (function animLoop(){
      window.requestAnimFrame(animLoop);
      if (lastScroll === $(window).scrollTop()) {
        return;
      }
      lastScroll = $(window).scrollTop();
      var pc = (faqTitleMaxScroll - lastScroll) / faqTitleMaxScroll;
      $faqTitle.css("opacity", Math.min(1, Math.max(0, pc)));
      $faqBg.css("opacity", Math.min(1, Math.max(0, 0 - 1 * pc)) )
      $nav.css("top", Math.min(0, -lastScroll) + "px");
      $topIcon.css("top", 10 + Math.min(0, -lastScroll) + "px");
    })()
  }

  function scrolled() {
    if (Date.now() - transitionTime <= 200) return;
    var distance = $window.scrollTop() - ($main.position().top / 2);
    if (!$faqTitle.length && $body.hasClass('anchored') && distance < -50) {
      $body.removeClass('anchored');
      $nav.fadeOut(500);
      transitionTime = Date.now();
    } else if (!$body.hasClass('anchored') && distance >= 0) {
      $body.addClass('anchored');
      $nav.fadeIn(500);
      transitionTime = Date.now();
    }

    distance = $(window).scrollTop() - ($main.position().top * 2 / 3);
    if (!$whoWeAre.hasClass('colored') && distance >= 0) {
      $whoWeAre.addClass('colored');
    }
  }

  window.onscroll = scrolled;

  $('body')
    .on('click', 'a[href="#join-us"], li.join-us', function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#team').addClass('joining');
    })
    .on('click', '.join-form a.back', function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#team').removeClass('joining');
    })
    .on('click', 'a[href^="#"]', function (ev) {
      var href = $(this).attr('href');
      if (href == '#')
        return;
      $.scrollTo(href, 500, {
        offset: {top: -67},
        easing: 'easeOutQuint',
        onAfter: function() {
          if (["#groupe", "#entreprise"].indexOf(href) !== -1) {
            $(href).trigger("click");
          }
        }
      });
      ev.preventDefault();
    })
    .on('focus', "#team input", function (ev) {
      $('#team').addClass("joining");
    })
    .on('click', '#what-we-do article a.close', function(ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#what-we-do').attr('data-active', 'none');
    })
    .on('click', '#signup-form a.close', function(ev) {
      ev.preventDefault();
      $('#signup-form').removeClass('visible');
      setTimeout(function() { $('a.sign-up').fadeIn(50); }, 200);
    })
    .on('click', '#what-we-do article', function (e) {
      e.preventDefault();
      $(this).closest('#what-we-do').attr('data-active', $(this).attr('id'));
    })
    .on('click', 'form a.submit', function(e) {
      e.preventDefault();
      var form = $(this).closest('form');
      var btn = $(this);

      if (btn.data('loading'))
        return;

      btn.data('loading', true);
      $.post(form.attr('action'), form.serialize()).always(function(data) {
        if (data.msg == 'success') form[0].reset();
        form.attr('class', data.msg);
        btn.data('loading', false);
      });
    })
    .on('click', '#email-us', function(ev) {
      var parts = ["contact", "sakado"];
      var string = [parts.join("@"), "ca"].join(".");
      var lk = $(this).attr("href", temp.join("") + ":" + string);
      setTimeout(function () {
        lk.attr("href", "#");
      }, 0);
    })
    .on('click', 'a.sign-up', function(e) {
      e.preventDefault();
      $(this).fadeOut(50);
      $('#signup-form').addClass('visible');
    });

  scrolled();
});