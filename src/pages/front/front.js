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
