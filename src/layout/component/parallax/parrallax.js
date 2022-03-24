function parallax() {

    $.fn.parallax = function(resistance, mouse) {
  $el = $(this);
  TweenLite.to($el, 0.2, {
    x: -((mouse.clientX - window.innerWidth / 2) / resistance),
    y: -((mouse.clientY - window.innerHeight / 2) / resistance)
  });
    };
    
    

  $(document).mousemove(function (e) {
    if ($(window).width() > 992) {
      $('[data-parallax]').each(function () {
        $(this).parallax($(this).data('parallax'), e);
      })
    }
  });
}