$(function(){
	var makeup_carousel = '';
	var makeup_carousel_dots = $('.makeup-controls-item');
	makeup_carousel = $('.makeup-carousel').owlCarousel({
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		autoHeight: true,
		dots: false,
		onInitialized: function(e){
			setTimeout(function(){
				makeup_carousel.trigger('refresh.owl.carousel');
				makeup_carousel_dots.each(function(i){
					var btn = $(this);
					btn.click(function(){
						makeup_carousel.trigger('to.owl.carousel', i);
						makeup_carousel_dots.removeClass('active')
						btn.addClass('active');
					});
				});
				makeup_carousel_dots.eq(0).addClass('active');
			}, 100);
		}
	});
	makeup_carousel.on('translated.owl.carousel', function(e){
		makeup_carousel_dots.removeClass('active');
		makeup_carousel_dots.eq(e.item.index).addClass('active');
	});

	
	


	var swim_carousel = $('.swim-carousel').owlCarousel({
		items: 1,
		slideBy: 1,
		responsive:{
			768:{
				items: 3,
				slideBy: 3
			},
			480:{
				items: 2,
				slideBy: 2
			}
		}
	});
	$('.swim-arrow').each(function(){
		var arrow = $(this);

		arrow.click(function(){
			if (arrow.hasClass('next')){
				swim_carousel.trigger('next.owl.carousel');
			} else if (arrow.hasClass('prev')){
				swim_carousel.trigger('prev.owl.carousel')
			}
		});
	});



	var __mobile__ = false;
	if ($(window).width() < 768){
		__mobile__ = true;
	}
	$(window).resize(function(){
		if ($(window).width() < 768){
			__mobile__ = true;
		} else {
			__mobile__ = false;
		}
	});
	$('.search-btn').click(function(e){
		var btn = $(this),
			href = 'http://www.spletnik.ru/search?search=',
			href_search = '';
		if (__mobile__ == false){
			if ($('.search-form').hasClass('opened')){
				href_search = encodeURIComponent($('.search-input').val());
				btn.attr('href', (href + href_search));
				return true;
			} else {
				e.preventDefault();
				$('.search-form').addClass('opened');
				$('.search-input').focus();
			}
		} else {

		}
	});
	$('.search-form').on('submit', function(e){
		e.preventDefault();
		var href = 'http://www.spletnik.ru/search?search=',
			href_search = '';
		href_search = encodeURIComponent($('.search-input').val());
		window.open((href + href_search), '_blank');
	});
	$(document).click(function(e){
		if (
			(!$(e.target).hasClass('search'))&&
			($(e.target).parents('.search').length <= 0)
		){
			$('.search-form').removeClass('opened');
		}
	});



	$('.navbar-toggle').click(function(){
		$('.navbar-nav').toggleClass('collapsed');
	});


	$('.profile-toggle').click(function(){
		$('.profile').toggleClass('collapsed');
	});



	$('.photo-int').each(function(i){
		var photo = $(this),
			hover = $('.photo-int__hover', photo),
			timer = null;

		photo.mouseenter(function(){
			timer = setTimeout(function(){
				photo.addClass('active');
				timer = setTimeout(function(){
					photo.removeClass('active');
				}, 3000);
			}, 2000);
		});
		photo.mouseleave(function(){
			clearTimeout(timer);
			timer = null;
			photo.removeClass('active');
		});
		photo.click(function(){
			photo.toggleClass('active');
			clearTimeout(timer);
			timer = null;
		});
	});
	$(document).click(function(e){
		if (
			(!$(e.target).hasClass('photo-int'))&&
			($(e.target).parents('.photo-int').length <= 0)
		){
			$('.photo-int').removeClass('active');
		}
	});




	/* Скрипты для демонстрации */
	$('.header-underlay__title[rel="personal"]').hide();
	$('.header-underlay__title[rel="pairs"]').show();
	$('.profile-user').hide();
	$('.profile-anonim__btn-link').click(function(e){
		e.preventDefault();
		$('.profile-user').show();
		$('.profile-anonim').hide();
		$('.header-underlay__title[rel="personal"]').show();
		$('.header-underlay__title[rel="pairs"]').hide();
	});
	$('.profile-user-mail').click(function(e){
		e.preventDefault();
		$('.profile-user').hide();
		$('.profile-anonim').show();
		$('.header-underlay__title[rel="personal"]').hide();
		$('.header-underlay__title[rel="pairs"]').show();
	});
	/* /Скрипты для демонстрации */
});