"use strict";


(function() {
  // Variables
  // ===================

  var $html = $('html'),
      $document = $(document),
      $window = $(window),
      i = 0;



  // Scripts initialize
  // ===================

  document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

  $(window).on('load', function () {

    // =======
    // Preloader
    // =======

    var $preloader = $('#page-preloader');
    $preloader.delay(1000).fadeOut('slow');


    // =======
    // Google Map
    // =======
    var map = $(".map");
    if(map.length){
      var mapWrapper = $('#google-map'),
          latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
          styles = 
          [
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                { "saturation": 36 },
                { "color": "#000000" },
                { "lightness": 40 }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [
                { "visibility": "on" },
                { "color": "#000000" },
                { "lightness": 16 }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 20 }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 17 },
                { "weight": 1.2 }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 20 }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 21 }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 17 }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 29 },
                { "weight": 0.2 }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 18 }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 16 }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 19 }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                { "color": "#000000" },
                { "lightness": 17 }
              ]
            }
          ],
          myOptions = {
            scrollwheel: false,
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: styles
          },
          map = new google.maps.Map(mapWrapper[0], myOptions),
          marker = new google.maps.Marker({
            position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
            draggable: false,
            animation: false,
            map: map,
            icon: 'img/marker.png'
          }),
          infowindow = new google.maps.InfoWindow({
            content: mapWrapper.data("text")
          });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });


  $document.ready(function () {

    function detectElement(dom) {
      return $window.height() + $window.scrollTop() >= dom.offset().top && $window.scrollTop() <= dom.outerHeight() + dom.offset().top;
    }

    // ==========
    // AJAX form
    // ==========
    var ajaxForm = $('.js-form');
    var jsForm = $('.contact-form');
    var resultPanel = $("body").append("<div class='js-result'></div>").find(".js-result");

    if (jsForm.length) {

      jsForm.each(function(){
        var $form = $(this);

        $form.ajaxForm({
          success: function(json) {
            var jsJSON = JSON.parse(json);
            resultPanel.text(jsJSON.message);

            if (jsJSON.valid) {

              resultPanel[0].classList.add("success");

              setTimeout(function () {
                resultPanel[0].classList.remove("success");
                $form.clearForm();
              }, 3000);

            } else {

              resultPanel[0].classList.add("error");

              setTimeout(function () {
                resultPanel[0].classList.remove("error");
              }, 4500);
            }
          }
        });

      });
    }


    // ==========
    // jQuery ajaxChimp
    // ==========
    var chimpForm = $('.subscription-form form');

    chimpForm.ajaxChimp({
      callback: function(){
        var panel = $('.js-result');
        setTimeout(function () {
          panel.removeClass("error").removeClass("success");
        }, 4500);
      },
      language: 'cm',
      url: '//cear-studio.us13.list-manage.com/subscribe/post?u=5c10401fe692f6eddbd86220f&amp;id=b974661486'
      //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    });


    $.ajaxChimp.translations.cm = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    // ==========
    // Responsive Nav
    // ==========
    var responsiveNav = new Navigation({
      initClass: "nav",
      mobileClass: "nav-mobile",
      desktopClass: "nav-desktop",
      checkHeight: false,
      stuck: true,
      stuckOffset: 1,
      onePage: true,
      onePageOffset: 100
    });

    // =======
    // Parallalx.js
    // =======
    var parallax = $('.parallax-bg');

    if (parallax.length > 0) {
      parallax.parallax();
    }

    // ==========
    // Video 
    // ==========
    var video = $('.video-section');

    if (video.length) {
      var videoItem = video.find('.video');

      video.on("click", function(){
        video.toggleClass("video-section-play");
        videoItem.get(0).paused ? videoItem.get(0).play() : videoItem.get(0).pause();
      });
    }

    // =======
    // Responsive Tabs
    // =======
    var tabs = $('.responsive-tabs');

    if (tabs.length > 0) {
      var i = 0;
      for (i = 0; i < tabs.length; i++) {
        var $this = $(tabs[i]);
        $this.easyResponsiveTabs({
          type: $this.attr("data-type"),
          tabidentify: $this.find(".resp-tabs-list").attr("data-group") || "tab",
          activate: function() {
            setTimeout(function() {
              $('.resp-accordion.resp-tab-active')[0].scrollIntoView();
            }, 500);
           }
        });
      };
      $(".resp-tabs-list li").on("click", function(){
        $window.trigger("resize");
      });
    }

    // =======
    // UIToTop
    // =======
    $().UItoTop();
   
    // =======
    // Owl carousel
    // =======
    var owl1 = $('.owl-1');
    if (owl1.length) {
      owl1.owlCarousel({
        mouseDrag: false,
        nav: false,
        loop: true,
        autoplay: true,
        dots: false,
        items: 6,
        responsiveClass:true,
        responsive:{
          0:{ items:1, },
          480:{ items:2, },
          768:{ items:4, },
          992:{ items:4, },
          1200: { items:6, },
          1800: { items:6, }
        }
      });
    }

    // =======
    // Popover
    // =======
    var popover = $(".popover");
    if(popover.length){
      popover.on("click", function(){
        if($(this).hasClass("ready")){
          popover.removeClass("open");
          $(this).toggleClass("open");
          popover.addClass("ready");
          $(this).toggleClass("ready");
        } else {
          popover.removeClass("open");
          popover.addClass("ready");
        }
      });
    }

    // =======
    // jQuery Count To
    // =======
    var counter = $('.counter');

    if (counter.length) {
      var counterToInit = counter.not(".init");
      $document.on("scroll", function () {
        counterToInit.each(function(){
          var item = $(this);

          if ((!item.hasClass("init")) && (detectElement(item))) {
            item.countTo({
              refreshInterval: 20,
              speed: item.attr("data-speed") || 1000
            });
            item.addClass('init');
          }
        });
        $document.trigger("resize");
      });
      $document.trigger("scroll");
    }

    // =======
    // WOW
    // =======
    if ($html.hasClass('desktop')) { new WOW().init(); }

    // =======
    // ISOTOPE
    // =======
    var isotope = $('.iso');

    if (isotope.length) {
      $( function() {
        var $grid = $('.grid').isotope({
          itemSelector: 'article',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: 1
          },
        });

        $(window).on("load", function(){
          $('.filters-button-group .is-checked').trigger('click');
        });
        $(window).on("resize", function(){
          $('.filters-button-group .is-checked').trigger('click');
        });

        // filter buttons
        $('.filters-button-group').on( 'click', 'button', function() {
          var filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
        $('.button-group').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      });

      // debounce so filtering doesn't happen every millisecond
      function debounce( fn, threshold ) {
        var timeout;
        return function debounced() {
          if ( timeout ) {
            clearTimeout( timeout );
          }
          function delayed() {
            fn();
            timeout = null;
          }
          timeout = setTimeout( delayed, threshold || 100 );
        }
      }

      $(window).on("load", function() {
        $('#all').trigger("click");
      });
    }
    
  });

})();