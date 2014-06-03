(function () {
  var transitionTime = 0;
  window.onscroll = function () {
    console.log("S");
    var $body = $('body');
    if (Date.now() - transitionTime <= 200) return;
    var distance = $(window).scrollTop() - $('#main').position().top;
    if ($body.hasClass('anchored') && distance < -50) {
      $body.removeClass('anchored');
      transitionTime = Date.now();
    } else if (!$body.hasClass('anchored') && distance >= 0) {
      $body.addClass('anchored');
      transitionTime = Date.now();
    }
  }
})();

$(function () {
  $('div#main #what-we-do article').click(function (e) {
    e.preventDefault();
    console.log($(this).closest('#what-we-do'), $(this).attr('id'))
    $(this).closest('#what-we-do').attr('data-active', $(this).attr('id'));
  })
});