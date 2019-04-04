$( document ).ready(function() {

    // validation of chosen on change
    var selectEl = $(".chosen");
    if ( selectEl.length > 0) {
        selectEl.chosen({disable_search_threshold: 10});
        selectEl.each(function() {
            if ($(this).attr('required') !== undefined) {
                $(this).on("change", function() {
                    $(this).valid();
                });
            }
        });
    }

    $.validator.setDefaults({ ignore: ":hidden:not(select)" });
    // validation
    $('#form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            confirm: "required",
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            username: {
                required: "Your full name must consist of at least 3 characters!"
            },
            confirm: "Please accept our policy",
            chosen: "This field is required!",
            message: "Your message must consist of at least 10 characters!"
        },
        submitHandler: function(form) {
            // ajax and reset
            $(form)[0].reset();
            selectEl.val('').trigger("chosen:updated");
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) { alert('Thanks, message was sent!'); },
                error: function(err) { console.log('Message was not sent!'); }
            });
        }
    });

    //handlers for header
    $("section").scroll2Section({menu:'header',offsetTop:70});
    var $hamburger = $('.hamburger');
    $hamburger.on('click',function(){
        $(this).toggleClass('open');
        $('.header__nav').toggleClass('open');
    });
    $('.drop-handler').on('click',function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.drop-menu').toggleClass('active');
    });
    $('.header__list > li a').on('click', function () {
        $hamburger.trigger('click');
    });

    // change header
    var nav_menu = $('header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 2) {
            nav_menu.addClass("scroll");
        } else {
            nav_menu.removeClass("scroll");

        }
    });

    // call Function
    initMap();

    // global slider
    var swiper = new Swiper('.swiper-container', {
        speed: 1000,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // product slider
    var swiperProduct = new Swiper('.products__slider', {
        speed: 1300,
        autoplay: {
            delay: 6000,
        },
        loop: true,
        slidesPerView: 1,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var isEvent = false;
    $(window).scroll(function(){
        if ( $('.skills-wrapper').visible(true)&& !isEvent ) {
            isEvent = true;
            setTimeout(function(){

                $('.skills-wrapper__skillbar').each(function(){
                    // animation width skill bar
                    var $percent = $(this).attr('data-percent'),
                        $percentChanged = $percent+'%',
                        $skillPercent = $(this).find('.skills-wrapper__skill-bar-percent');

                    $(this).find('.skills-wrapper__skillbar-bar').animate({
                        width:$percentChanged
                    },1200);
                    // animation percent skill bar
                    $({ countNum: $skillPercent.text()}).animate({
                            countNum: $percent
                        },
                        {
                            duration: 1000,
                            easing:'linear',
                            step: function() {
                                $skillPercent.text(Math.floor(this.countNum)+' %');
                            },
                            complete: function() {
                                $skillPercent.text(this.countNum+' %');
                            }

                        }
                    );

                });
            }, 500)
        }
    });

});

// API google map
function initMap() {
    var coordinates = {lat: 49.832956,  lng: 24.022417},
        zoom = 15,

        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: zoom,
            disableDefaultUI: true,
            scrollwheel: false
        })
        styles = [
            {
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#80ffff"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#0080ff"
                    },
                    {
                        "lightness": 35
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#503392"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#0000ff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#80ffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#009dda"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#0000ff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#80ffff"
                    }
                ]
            }
        ]
         map.setOptions({styles: styles});
}

// position in window
$.fn.visible = function(partial){

    var $t				= $(this),
        $w				= $(window),
        viewTop			= $w.scrollTop(),
        viewBottom		= viewTop + $w.height(),
        _top			= $t.offset().top,
        _bottom			= _top + $t.height(),
        compareTop		= partial === true ? _bottom : _top,
        compareBottom	= partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};