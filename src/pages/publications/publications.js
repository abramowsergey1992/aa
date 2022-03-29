function publications() {
    if ($('.publications').length) {
        console.log('sadas');
     var containerEl = document.querySelector('.publications__row');

            var mixer = mixitup(containerEl);
    }
  $('.video-popup__close , .video-popup__overlay').click(function (e) {
    e.preventDefault();
    let $video = $(this).closest('.video-popup');
    $video.fadeOut();
    $video.find('.video-popup__wrap').html();
  });
  $('._video-popup').click(function (e) {
    e.preventDefault();
    let $video = $($(this).attr('href'));
    $video.find('.video-popup__wrap').html($video.find('.video-popup__hidden').html());
    $video.fadeIn();
  })
}