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
    
        $('._hover-style').hover(function () {
            $body.addClass("_hover-style")
            $cursor.addClass("_hover-style")
        }, function () {
            $body.removeClass("_hover-style")
            $cursor.removeClass("_hover-style")
        })
       
   
        if (window.matchMedia('(min-width: 991px)').matches) {

            $(document).on('mousemove', function (e) {
                $('._hover-social,._hover-publication').each(function () {
                    if (this.matches(':hover') ) {
                         gsap.to($rombinvert, 0.3, {
                            x: (e.pageX - $(this).offset().left + 4),
                            y: (e.pageY - $(this).offset().top - 16),
                            ease: Power4.easOut
                        });
                    }
                })
                
                gsap.to($st1nameR, 0.3, {
                    x: (e.pageX - $st1name.offset().left + 5),
                    y: (e.pageY - $st1name.offset().top - 55),
                    ease: Power4.easOut
                });
                gsap.to($st1descR, 0.3, {
                    x: (e.pageX - $st1desc.offset().left + 5),
                    y: (e.pageY - $st1desc.offset().top - 55),
                    ease: Power4.easOut
                });

                gsap.to($cursor, 0.3, {
                    left: e.pageX + 5,
                    top: e.pageY  + 5,
                    ease: Power4.easOut
                });
            });
        }
}