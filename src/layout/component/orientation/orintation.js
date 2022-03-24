function orientation () {
   
    function stopVideo() {
        let   video = document.querySelector(".swiper-slide-active .step__bg");
          video.pause();
        //   video.currentTime = 0;
     }
    function playVideo(){
                let   video = document.querySelector(".swiper-slide-active .step__bg");

          video.play();
        //   video.currentTime = 0;
     }
    var mql = window.matchMedia("(orientation: portrait)");

        if(mql.matches) {  
            // Портретная ориентация
            stopVideo()
        } else {  
            // Горизонтальная ориентация
        }

        // Прослушка события изменения ориентации
        mql.addListener(function(m) {
            if(m.matches) {
                // Изменено на портретный режим
                stopVideo()
            }
            else {
                // Изменено на горизонтальный режим
                playVideo()
            }
        });

}