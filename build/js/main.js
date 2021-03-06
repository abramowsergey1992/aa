function wait () {
    var video = document.getElementById("wait-video");
    function stopVideo(){
          video.pause();
          video.currentTime = 0;
     }
    function playVideo(){
          video.play();
          video.currentTime = 0;
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

function frontSlider() {
	if($('.step').length){
	$(".step-1__name").html(
		$(".step-1__name").html() +
			'<div class="step-1__name-back">' +
			$(".step-1__name").html() +
			"</div>"
	);
	$(".step-1__desc").html(
		$(".step-1__desc").html() +
			'<div class="step-1__desc-back">' +
			$(".step-1__desc").html() +
			"</div>"
	);

	let $preloaderProcent = $(".preloader__procent");
	let $preloaderImg = $(".preloader__img");
	let $preloaderProgress = $(".preloader__progress");
	let secPreloader = 9000;
	console.log(secPreloader);
	let timePreloader = 0;
	let timeAnim=0
	let rotate = 90;

	const frontSwiper = new Swiper(".swiper", {
		direction: "vertical",
		effect: "fade",
		allowTouchMove: true,
		enabled: false,
		mousewheel: {
			forceToAxis: true,
        },
        breakpoints: {
            992: {
                allowTouchMove: true,
            },
        },
		pagination: {
			el: ".swiper-pagi",
			clickable: true,
			renderBullet: function (index, className) {
				return (
					'<span class="' +
					className +
					'"><span>0' +
					(index + 1) +
					"</span></span>"
				);
			},
		},
		on: {
			init: function () {},
			init: function () {},
		},
	});
		if (!$.cookie('load')) {
		$('.preloader').css('display','flex')
		let preloader = setInterval(function () {
			
			timePreloader +=  100;
			$preloaderProcent.text(
				parseInt(100 / (secPreloader / timePreloader)) + "%"
			);
			$preloaderProgress.css(
				"width",
				100 / (secPreloader / timePreloader) + "%"
			);

			// console.log(timeAnim);
			if (timeAnim == 600) {
				
				console.log(rotate);
				timeAnim = 0;
				pastTime = timePreloader;
				gsap.to($preloaderImg, 0.3, {
					rotation: rotate,
					left: 100 / (secPreloader / timePreloader) + "%",
					ease: Power4.easOut,
					onComplete: function () {
							rotate += 90;
					}
				});
			} else {
				timeAnim += 100;
				
			}
			if (secPreloader <= timePreloader) {
				clearInterval(preloader);
				$(".preloader").fadeOut();
				setTimeout(function () {
					$("body").addClass("_go");
					$(".step-1").addClass("swiper-slide-active");
					let startVideo = document.getElementById("video-1");
					startVideo.currentTime = 0;
					startVideo.play();
					$.cookie('load', 'true');
					frontSwiper.enable();
					$("body").addClass("_play-video");
				}, 200);
			}
		}, 100);
		//Сайт загружен, меняем время окончания лоадера
		Pace.on("done", function () {
			secPreloader = timePreloader + 2000;
		});
	} else {
		$("body").addClass("_go");
					$(".step-1").addClass("swiper-slide-active");
					let startVideo = document.getElementById("video-1");
					startVideo.currentTime = 0;
					startVideo.play();
					$.cookie('load', 'true');
					frontSwiper.enable();
					$("body").addClass("_play-video");
	}
	frontSwiper.on('slideChange', function () {
		$('.step').each(function (i) {
			console.log(i);
			if (i != frontSwiper.activeIndex) {
				$(this).addClass('_no-anim')
			} else {
				$(this).find('.step__bg')[0].currentTime = 0;
			}
			
			setTimeout(function () {
				$('.step').removeClass('_no-anim')
			},100)
		})
	});
	let ifPrevDuration = false;
    
	// 	let scroll = 0;
	// $('.step-slider').mousewheel(function (event) {
	// 	if(!if_play){
	// 		scroll += event.deltaY * event.deltaFactor;
	// 		if (scroll <= -100) {
	// 			frontSwiper.slideNext();
	// 			scroll = 0;
	// 			if_play=true;
	// 		}
	// 		if (scroll >= 100) {
	// 			if_play=true;
	// 			let video = $(".swiper-slide-active .step__bg")[0];
	// 			let currentTime = video.currentTime
	// 			 console.log('sad',currentTime)
	// 			// gsap.to(video, currentTime ,{currentTime: 0,ease: Power4.easOut});
			
	// 			intervalRewind = setInterval(function(){
	// 				 video.playbackRate = 1.0;
	// 				 console.log(video.currentTime == 0, video.currentTime ,'== ',0);
	// 				if (video.currentTime <= 0.2) {
	// 					console.log('stop');
	// 					clearInterval(intervalRewind);
	// 					video.pause();
	// 					frontSwiper.slidePrev();
	// 				}
	// 				else {
	// 					currentTime += -.2;
	// 					video.currentTime = currentTime;
	// 					console.log(video.currentTime);
	// 				}
	// 			},200);
				
	// 			scroll = 0;
				
	// 		}
	// 		console.log('scroll', scroll);
	// 	}
	// });
	frontSwiper.on('slidePrevTransitionStart', function (swiper) {
		console.log('slidePrevTransitionStart');
		swiper.slideReset(0)
		if (!ifPrevDuration) {
			ifPrevDuration = true;

			
		} else {
			
		}
	});
	$(".step__go").click(function () {
		if ($(this).hasClass("_up")) {
			frontSwiper.slidePrev();
		} else {
			frontSwiper.slideNext();
		}
	});
	$(".swiper-slide-active").removeClass("swiper-slide-active");

	frontSwiper.mousewheel.disable();
	frontSwiper.on("beforeSlideChangeStart", function (swiper) {
		frontSwiper.mousewheel.disable();
		$("body").addClass("_play-video");
	});
	$(".step__bg").on("ended", function () {
		setTimeout(function () {
			$("body").removeClass("_play-video");
            if ($(window).width() < 992) {
                frontSwiper.allowTouchMove = true;
            } else {
                frontSwiper.mousewheel.enable();
            }
		}, 50);
	});
    frontSwiper.on("slideChange", function (swiper) {
        if ($(window).width() < 992) {
            frontSwiper.allowTouchMove = false;
        } else {
            frontSwiper.mousewheel.disable();
        }

		$("body").addClass("_play-video");
		let video =
			swiper.slides[swiper.activeIndex].querySelector(".step__bg");
		video.currentTime = 0;
		$('.swiper-slide:not(".swiper-slide-active") .step__bg').each(
			function () {
				this.currentTime = 0;
			}
		);
		video.play();
		isPlaying = true;
	});}
}

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
function cursor() {
        let $body = $('body');
        let $cursor = $('.cursor');
        // let $cursorMain = $('.cursor__main');
        let $st1name = $('.step-1__name');
        let $st1nameR = $('#rombS1name rect');
        let $st1desc = $('.step-1__desc');
        let $st1descR = $('#rombS1desc rect');
        let $rombinvert = $('#rombinvert rect');
        // let $topTitleMask = $('.top__title-mask');
        $('._hover-social').each(function () {
            $(this).html($(this).html() + '<div class="_hover-social-back">' + $(this).html() + '</div>')
             $(this).hover(function () {
                $body.addClass("_hover-soc")
                $cursor.addClass("_hover-soc")
            }, function () {
                $body.removeClass("_hover-soc")
                $cursor.removeClass("_hover-soc")
            })
        })

        $('._hover-publication').html( $('._hover-publication').html() + '<div class="_hover-publication-back">' +  $('._hover-publication').html() + '</div>')
        $('._hover-publication').hover(function () {
            $body.addClass("_hover-public")
            $cursor.addClass("_hover-public")
        }, function () {
            $body.removeClass("_hover-public")
            $cursor.removeClass("_hover-public")
        })
    
        $('.container a, .step__content a, .step__content button, ._hover').hover(function () {
            $body.addClass("_hover-it")
            $cursor.addClass("_hover-it")
        }, function () {
            $body.removeClass("_hover-it")
            $cursor.removeClass("_hover-it")
        })
       
   
        if (window.matchMedia('(min-width: 991px)').matches) {
            let x, y;
            $(document).on('mousemove', function (e) {
                 x = e.pageX ;
                 y = e.pageY     
                $('._hover-publication').each(function () {
                    if (this.matches(':hover') ) {
                         gsap.to($rombinvert, 0.3, {
                            x: (e.pageX - $(this).offset().left + 4),
                            y: (e.pageY - $(this).offset().top - 16),
                            ease: Power4.easOut
                         });
                      
                        let $th =$(this)
    
                        setTimeout(function () {
                             gsap.to($rombinvert, 0.3, {
                            x: (x - $th .offset().left + 4),
                            y: (y - $th .offset().top - 16),
                            ease: Power4.easOut
                             });
                        },300)
                    }
                })
                $('._hover-social').each(function () {
                    if (this.matches(':hover') ) {
                         gsap.to($rombinvert, 0.3, {
                            x: (e.pageX - $(this).offset().left + 4),
                            y: (e.pageY - $(this).offset().top - 16),
                            ease: Power4.easOut
                         });
                        
                    }
                })
                if($st1name.length){
                gsap.to($st1nameR, 0.3, {
                    x: (e.pageX - $st1name.offset().left + 5),
                    y: (e.pageY - $st1name.offset().top - 55),
                    ease: Power4.easOut
                });
                }
                if ($st1descR.length) {
                    gsap.to($st1descR, 0.3, {
                        x: (e.pageX - $st1desc.offset().left + 5),
                        y: (e.pageY - $st1desc.offset().top - 55),
                        ease: Power4.easOut
                    });
                }
                gsap.to($cursor, 0.3, {
                    left: e.pageX + 5,
                    top: e.pageY  + 5,
                    ease: Power4.easOut
                });
            });
        }
}
$(function () {
    cursor();
    parallax();
    frontSlider();
    orientation();
    publications();
}) 

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
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
var width = window.innerWidth;
window.addEventListener('resize', () => {
    if(width != window.innerWidth ){
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        width = window.innerWidth;
    }
});