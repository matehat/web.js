
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

  if ($faqTitle.length) {
    var faqTitleMaxScroll = $main.position().top / 2;
    (function animLoop(){
      window.requestAnimFrame(animLoop);
      var pc = (faqTitleMaxScroll - $(window).scrollTop()) / faqTitleMaxScroll;
      $faqTitle.css("opacity", Math.min(1, Math.max(0, pc)));
      $faqBg.css("opacity", Math.min(1, Math.max(0, 0 - 1 * pc)) )
      $nav.css("top", Math.min(0, -$(window).scrollTop()) + "px");
      $topIcon.css("top", 10 + Math.min(0, -$(window).scrollTop()) + "px");
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
    .on('click', 'a.sign-up', function(e) {
      e.preventDefault();
      $(this).fadeOut(50);
      $('#signup-form').addClass('visible');
    });

  scrolled();
});