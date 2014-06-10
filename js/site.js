(function () {
  var transitionTime = 0;
  window.onscroll = function () {
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
  }
})();

$(function () {
  $('div#main #what-we-do article').click(function (e) {
    e.preventDefault();
    $(this).closest('#what-we-do').attr('data-active', $(this).attr('id'));
  });
  
  var $main = $('#main');
  $(window).resize(function (e) {
    var height = window.innerHeight;
    console.log('?');
    if (height < 600) {
      $main.css('top', '600px');
    } else {
      $main.css('top', '');
    }
  });
  
  ['apprenez', 'enseignez'].forEach(function (anchor) {
    $('body a[href="#'+ anchor +'"]').click(function (ev) {
      ev.preventDefault();
      $('#what-we-do').attr('data-active', anchor);
      $(window).scrollTop($('#what-we-do').offset().top - 68);
    })
  })
});