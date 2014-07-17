$(function () {
  // var $main = $('#main');
  // $(window).resize(function (e) {
  //   var height = window.innerHeight;
  //   if (height < 660) {
  //     $main.css('top', '660px');
  //   } else {
  //     $main.css('top', '');
  //   }
  // });
  
  var transitionTime = 0;
  function scrolled() {
    var $body = $('body');
    if (Date.now() - transitionTime <= 200) return;
    var distance = $(window).scrollTop() - ($('#main').position().top / 2);
    if ($body.hasClass('anchored') && distance < -50) {
      $body.removeClass('anchored');
      $('nav').fadeOut(500);
      transitionTime = Date.now();
    } else if (!$body.hasClass('anchored') && distance >= 0) {
      $body.addClass('anchored');
      $('nav').fadeIn(500);
      transitionTime = Date.now();
    }
    
    distance = $(window).scrollTop() - ($('#main').position().top * 2 / 3);
    if (!$('#who-we-are').hasClass('colored') && distance >= 0) {
      $('#who-we-are').addClass('colored');
    }
  }

  window.onscroll = scrolled;
  
  $('body')
    .on('click', 'a[href="#join-us"], li.join-us', function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#team').addClass('joining');
    })
    .on('click', '.join-form a.close', function (ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#team').removeClass('joining');
    })
    .on('click', 'a[href^="#"]', function (ev) {
      if ($(this).attr('href') == '#') 
        return;
      $.scrollTo($(this).attr('href'), 500, {
        offset: {top: -67},
        easing: 'easeOutQuint'
      });
      ev.preventDefault();
    })
    .on('click', '#what-we-do article a.close', function(ev) {
      console.log('!', this);
      ev.preventDefault();
      ev.stopImmediatePropagation();
      $('#what-we-do').attr('data-active', 'none');
    })
    .on('click', '#what-we-do article', function (e) {
      e.preventDefault();
      console.log('!', this);
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
      $(this).fadeOut(200);
      $('#signup-form').addClass('visible');
    });
  
  scrolled();
});