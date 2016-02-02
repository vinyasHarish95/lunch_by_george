(function($){

"use strict";

var THEME = window.THEME || {};

THEME.loaderSite = function(){
	if($('#loader-site').length){
		var $site_init = false;

		setTimeout(function(){
			if(!$site_init){
				$site_init = true;
				$('#loader-site').fadeOut(400, function(){

					$(window).load(function(){
						THEME.init();
					});
					
				});
			}
		}, 5000);

		$(window).load(function(){
			$('#loader-site').fadeOut(400, function(){
				if(!$site_init){
					$site_init = true;
					THEME.init();
				}
			});
		});

	} else {
		
		$(window).load(function(){
			THEME.init();
		});
	
	}
}

THEME.css3animations = function(){

	function startAnimation(el){
		var $delay = $(el).data('delay');
		if($delay == ''){
			$delay = 0;
		}

		$(el).delay($delay).queue(function(){
			$(el).addClass('animated')
		});
	}

	function animateElements(){

		if( $('body[data-css3-animations="enabled"]')) {

			$('.animate').scrolledIntoView().on('scrolledin', function () {
				startAnimation(this);
			});
			

			$('.animate:in-viewport').each(function(){
				startAnimation(this);
			});
 		}

	}
	animateElements();
}


THEME.header = function(){
	function disableLink(){
		$('#header-menu a[href="#"]').on('click', function(){
			return false;
		});
	}
	disableLink();

	function sticky(){
		$('body[data-device="desktop"][data-header-transparent="false"] #header').sticky();
	}
	sticky();

	function transparentHeader(){
		var didScroll = false;
		$(window).scroll(function(){
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollFrontPage, 250 );
			}
		});


		function scrollFrontPage() {
			var sy = scrollY();
			if ( sy >= 280 ) {
				$('#header').removeClass('transparent').addClass('is-sticky');
			}
			else {
				$('#header').removeClass('is-sticky').addClass('transparent');
			}
			didScroll = false;
		}
		scrollFrontPage();

		function scrollY() {
			return window.pageYOffset || $('#header').scrollTop;
		}
	}
	transparentHeader();


	function showSubmenu(){

		$('#header-menu ul.menu').superfish().supposition();

		$('#header-menu ul.menu li.simple .sub-menu li').each(function(){
			if($(this).find('ul.sub-menu').length > 0) {
				$(this).find('> a').append('<span class="more"><i class="icon-angle-right arrow"></i></span>');
			}
		});
	}
	showSubmenu();

	function mobileMenu(){
		$('#header-mobile li.menu-item-has-children > a').each(function(){
			$(this).append('<span class="more"><i class="entypo-plus arrow"></i></span>');
		});

		$('#menu-mobile-trigger').on('click', function(){
			$('#header').toggleClass('open');
			$(this).toggleClass('open');
			$('#header-mobile').slideToggle();
			return false;
		});

		$('#header-menu-mobile .menu-item-has-children > a').on('click', function(){
			var $target = $(this).attr('href');
			if($target == '#'){
				$(this).toggleClass('open').next('ul').slideToggle();
				return false;
			}
		});

		$('#header-menu-mobile .menu-item-has-children > a .more').on('click', function(){
			$(this).parent('a').toggleClass('open').next('ul').slideToggle();	
			return false;
		});
	}
	mobileMenu();


	function fixMobileMenu(){
		if($(window).width() > 1199){
			$('#menu-mobile-trigger').removeClass('open');
			$('#header-mobile').css('display', 'none');
		}
		$('#header-sticky-wrapper').css('height', $('#header').outerHeight(true));
	}
	fixMobileMenu();

	$(window).resize(function(){
		fixMobileMenu();
	});
}


THEME.fullScreen = function(){
	function setHeight(){

		if($('body').data('header-fixed') == true && $('body').data('header-transparent') == false){
			var $offset = $('#header').outerHeight(true);
		} else {
			var $offset = 0;
		}

		var $h = $(window).height() - $offset;
		
		$('.page-section.fullscreen').css('height', $h);
	}

	setHeight();

	$(window).resize(function(){
		setHeight();
	})
}

THEME.buttonHero = function(){
	$('.button-hero').on('click', function(){
		if($('body').hasClass('onepage')){
			var $offset = $('header').outerHeight(true);
		} else {
			var $offset = $('body[data-header-fixed="true"] #header').outerHeight(true);
		}

		console.log($target);

		$.scrollTo($target, 1300, {offset : -$offset, easing: 'easeInOutExpo'});

		return false;
	})
}

THEME.onePageNav = function(){
	function onePageNav(){
		$('.onepage #header-menu, .onepage #header-menu-mobile').singlePageNav({
			offset : $('#header').outerHeight(true),
			updateHash : true,
			currentClass : 'current',
			filter : ':not(.target-page)'
		});
	}
	
	function hashNav(){
		if(window.location.hash){
			if($('body').hasClass('onepage')){
			$.scrollTo(
				window.location.hash, 
				1, 
				{
					offset : - $('#header').outerHeight(true)
				}
			);
			}
		}
		else{
			if($('body').hasClass('onepage')){
				$('body, html').animate({scrollTop:0},1);
				$('.onepage #header-menu a').removeClass('current').eq(0).addClass('current');
			}
		}
	}

	if($('body').hasClass('onepage')){
		onePageNav();
		hashNav();
	}
}


THEME.blog = function(){
	function blogMasonry(){
		var $container = $('.md-blog.masonry');
		$container.masonry({
		  columnWidth: '.item',
		  itemSelector: '.item'
		});
	}
	blogMasonry();
}


THEME.portfolio = function(){
	function portfolioMasonry(){
		var $container = $('.md-portfolio.masonry');
		$container.masonry({
		  columnWidth: '.item',
		  itemSelector: '.item'
		});
	}
	portfolioMasonry();

	function portfolioFilter(){
		$('.portfolio-filtered').isotope({
			itemSelector : '.item'
		});

		
		$('.md-portfolio-filter a').on('click', function(){
			var selector = $(this).attr('data-filter');
			
			$('.portfolio-filtered').isotope({ filter: selector });

			$('.md-portfolio-filter a').removeClass('active');
			$(this).addClass('active');
			
			$(this).parent('.md-portfolio-filter').find('.current').text($(this).text());
			
			return false;
		});
	}
	portfolioFilter();
}


THEME.loaderSite();
THEME.fullScreen();


THEME.init = function(){
	THEME.css3animations();
	THEME.header();
	THEME.buttonHero();
	THEME.onePageNav();
	THEME.blog();
	THEME.portfolio();
}


})(jQuery);