function frontSlider() {
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
	let secPreloader = 2000;
	let timePreloader = 0;
	let timeAnim=0
	let rotate=90;
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
				frontSwiper.enable();
				$("body").addClass("_play-video");
			}, 200);
		}
	}, 100);
	//Сайт загружен, меняем время окончания лоадера
	Pace.on("done", function () {
		// secPreloader = timePreloader + 2000;
	});

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
	let ifPrevDuration = false;

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
	});
}
