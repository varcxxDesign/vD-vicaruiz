/* weirdly written js code by @mathias, @cheeaun and @jdalton. */

(function(doc) {

	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));

/* JS Written by Adam Coulombe */

var transitionEnd = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd';
var animationEnd = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd';
var setMainDollyYOffset = setMainDollyYOffsetTranslate3D;
var scrollPos = 0;
var bgPos = 0;
var scrollCount = 0;
var wh=960;
var dh=960;
var aboutHeight = 600;
var dollyTopMargin=0;
var setHashTimeout;
var swipes = [];
var isiPhone = 	(navigator.userAgent.match(/iPhone/i))
				|| (navigator.userAgent.match(/iPod/i))
				? true : false ;
				
var isiPad = (navigator.userAgent.match(/iPad/i)) ? true : false;



/*
var initialScrollTimeout;
function welcomeIntro(){
	var $animatables = $("#welcome strong, #checkIt");
	var len = $animatables.length;
	$animatables.each(function(n){
		var $this=$(this);
		setTimeout(function(){
			$this.addClass('loaded').removeClass("out");
			if(n==len-1){ 
				$this.bind(transitionEnd,function(){
					$this.unbind(animationEnd);
					$("#welcome").addClass("animated");
				})
			}
		},125*n);
	});
}

function welcomeOutro(){
	$($("#welcome strong, #checkIt").get().reverse()).each(function(n){
		var $this=$(this);
		setTimeout(function(){
			$this.addClass('out');
		},125*n);
	});
}
*/
/*
function setHashWithDelay(hash){
	clearTimeout(setHashTimeout);
	if(!isNavClickedDynamicScroll){
		setHashTimeout = setTimeout(function(){
				$($.address).unbind('change');
				$.address.value(hash);
				$.address.change(addressChange);
		},700);
	}
}*/

function setMainDollyYOffsetTranslate3D(offset){
	$('#mainDolly').css({
		'-webkit-transform': 'translate3d(0px,'+ offset +'px,0px)' ,
		   '-moz-transform': 'translate3d(0px,'+ offset +'px,0px)',
				'transform':'translate3d(0px,'+ offset +'px,0px)',
				'-ms-transform':'translate3d(0px,'+ offset +'px,0px)',
			'-o-transform':'translate3d(0px,'+ offset +'px,0px)'
				
	});
}

function setMainDollyYOffsetTop(offset){
	$('#mainDolly').css({
		'top': offset });
}

var dynamicScrolling=false;
var dynamicScrollTimeout;
var dynamicScrollTarget;
var dynamicScrollCount = 0;
var isNavClickedDynamicScroll = true;

function dynamicScrollTo(target, offset,scrollSpeed){
	if(!scrollSpeed){scrollSpeed=0.2}
	if(!offset){offset=0}
	dynamicScrollTarget = target;

	var delta = (dynamicScrollTarget.offset().top+offset) - scrollPos;

	if(Math.abs(delta) <= 10 ){
	
		clearTimeout(dynamicScrollTimeout);
		dynamicScrollCount = 0;
		isNavClickedDynamicScroll = false;
		if(Modernizr.touch){
			$("#nav").css({position:'absolute',top:scrollPos});
		}
		/* $(document).bind('touchstart',function(){
			$(this).unbind('touchstart');
			$("#nav").css({position:'fixed',top:0});
		}); */
		//$(document).scrollTop(dynamicScrollTarget.offset().top+offset);
	}else{
		if(scrollPos+wh>=dh && dynamicScrollCount > 2 ){

			$(document).scrollTop(dh-wh);
			dynamicScrollCount = 0;
			isNavClickedDynamicScroll = false;
		}else if(scrollPos<1 && dynamicScrollCount > 2 ){

			$(document).scrollTop(0);
			dynamicScrollCount = 0;
		}else{

			$(document).scrollTop(scrollPos+(delta*scrollSpeed))
			dynamicScrollTimeout = setTimeout(function(){ dynamicScrollTo(dynamicScrollTarget,offset,scrollSpeed); },24);
			dynamicScrollCount++;
		}
	}
}




function goToWork(e){
		e.preventDefault();
		dynamicScrollTo($("#about"),-wh/7);
		$("#nav").css({position:'fixed',top:0});
		//$.scrollTo($("#work").offset().top + (Math.max(aboutHeight,wh/2)*0.2), 1000);
}



var contactSubmitClickedIndex = 0;
$(function(){
	
	var executejs = true;

	if ($.browser.msie && $.browser.version < 9){
		if (navigator.userAgent.indexOf("chromeframe") < 0){
			$('body').prepend('<div id="needChromeFrame"><div class="page">Hey there! My site is built using the latest HTML5 &amp; CSS3.<br/> Please activate Chrome Frame below or use a <a href="http://www.browserchoice.eu/">modern web browser</a> to experience my site!</div></div>');
			   CFInstall.check({
				 mode: "overlay",
				 destination: "http://adam.co"
			   });
			executejs = false;
		}
	}
	
	if(executejs){
			
	$('#contactForm').bind('success',function(e,comment){
		//alert(comment);
		$(this).find('input, textarea').val('');
		$(this).children('#response').removeClass('empty').html(comment);
	}).bind('error',function(e,comment){
		//alert(comment);
		$(this).children('#response').removeClass('empty').html(comment);
	}).submit(function(e){
		e.preventDefault();
			var $this = $(this);
		if( $this.find('input[name=email]').val() && $this.find('textarea[name=message]').val() ){
			
			var vars = $this.serialize();
			
			$.ajax({
				type:'POST',
				url:'contact.php',
				data: vars,
				
				success: function (data) {
				
					//$this.trigger(data.response,[data.comment]);
					$this.trigger('error',['Oh yeah! Thanks for checking in. I\'ll get back with you shortly.']);
					
					
				},
				error: function(){
				
					$this.trigger('error',['Oh no! Something went wrong. Maybe hit me up on twitter.']);
				}

			})

		}else{
			$this.trigger('error',['Please fill in both fields. There is only two of them!']);
		}
		
		$(function() {
		    var resetForms = function () {
		        $('#contactForm').each(function() {
		            this.reset();
		            this.removeData('data');
		        });
		    };
		
		    resetForms();
		
		    window.onbeforeunload = resetForms;
		});
	});
	
	if(isiPhone){
		$('html').addClass('is-iPhone');
	}else{
		$('html').addClass('not-iPhone');
	}
	
	if(!Modernizr.touch){
		setMainDollyYOffset = $('html').hasClass('csstransforms3d') ? setMainDollyYOffsetTranslate3D : ( setMainDollyYOffsetTop);
	}else{
		setMainDollyYOffset = setMainDollyYOffsetTop;
	}

//	$.pir.options.php="pir.php";
//	$("#work aside h2").pir({font: "Vitesse-Book.otf",casing:'uppercase', wrap: true});

	
	$(document).bind('touchmove', function(){ 
		$('#nav').css({position:'fixed',top:0});
	})


	if(!Modernizr.touch){
		$("#nav a").hover(function(){
			$(this).parent().addClass('hovered');
		},function(){
			$(this).parent().removeClass('hovered').addClass('leave').bind(transitionEnd,function(){
				$(this).unbind(transitionEnd).removeClass('leave');
			});
		});
	}
		
		var aEvent = Modernizr.touch ? 'touchstart' : 'click';
		
		$('#nav a').bind(aEvent,function(){
			dh=$(document).height();
		});
	

		$('#nav-home a').bind(aEvent,function(e){
			e.preventDefault();
			dynamicScrollTo($("#home"),-10);
			$("#nav").css({position:'fixed',top:0});
		});
		$('#nav-about a').bind(aEvent,function(e){
			e.preventDefault();
			dynamicScrollTo($("#about"),-wh/5);
			$("#nav").css({position:'fixed',top:0});
		});
		
		$('#nav-work a,#checkIt').bind(aEvent,goToWork);


				
		$('#nav-contact a').bind(aEvent,function(e){ 
			e.preventDefault();
			var offset = -60;
			var contactTop =$("#contact").offset().top ;
			if(contactTop + wh > dh){
				offset = -( contactTop - (dh-wh) );
			}
	
			dynamicScrollTo($("#contact"),offset);
			$("#nav").css({position:'fixed',top:0});
		});

	$(window).load(function(){
		
	var block = document.body.offsetWidth;
	  // Set a timeout...
	  
	  if(isiPhone){
		  setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
		  }, 0);
	  }

	
		$(this).scroll(onWindowScroll).resize(onWindowResize);
	
		onWindowResize();
		
		
	});
	
	
	}
	
});

function onWindowScroll(){
			
			scrollPos = $(document).scrollTop();

		// $("#header").css({
		// 	backgroundPosition:'center center, center '+ (- scrollPos * 0.3 ) +'px'
		// });

		if(!Modernizr.touch){
			dollyTopMargin = -(Math.floor(Math.min(Math.max(aboutHeight,wh/2),scrollPos) * 2)) ;
			setMainDollyYOffset(dollyTopMargin);
		}
	
		if( scrollPos <  wh/10) {
			if(isiPhone && scrollCount<1 ){
				$("#header").addClass('loadedBuggy').bind(animationEnd,function(){
					$(this).removeClass('loadedBuggy');
				});
			}else{
				$("#header").removeClass('out').addClass('in');
			}
			$('#about').addClass('out');
			$("#navItems").attr('class', "home");
		}else{
			
			$("#header").addClass('out').removeClass('in');
			
					if( scrollPos > wh/4 ){
						$('#about').removeClass('out').addClass('in');
						$("#navItems").attr('class', "about");
						
							if( scrollPos > $("#work").offset().top  - wh*0.85){
								$("#work").removeClass('out').addClass('in');		
								$("#navItems").attr('class', "work");
						
								
									if( scrollPos > $("#contact").offset().top- wh*0.85 ){
										$("#contact").removeClass('out').addClass('in');		
										$("#navItems").attr('class', "contact");
										
									}else{
										$("#contact").addClass('out').removeClass('in');
									}
											
							}else{
								$("#work").addClass('out').removeClass('in');
						
							}						
											
					}else{
						$('#about').addClass('out');
			
					}			

		}
		if(scrollPos>$("#main").offset().top){
			if(scrollPos>$("#footer").offset().top){
				$('#nav').removeClass('inverse');
			}else{
				$('#nav').addClass('inverse');
			}
			
		}else{
			$('#nav').removeClass('inverse');
		}


		if(scrollCount<1){
			$("#preloader").addClass('loaded');
			$(".workCarouselBox").each(function() {
			var $this=$(this);
			
			var controlsContainer= $(this).parent().siblings('aside');
			var numSlides = $(this).find(".workCarouselItem").length;
			var slideDisplayNumber  = $('<span class="slideDisplayNumber">1</span>');
			var slideDisplayDivider  = $('<span class="slideDisplayDivider">/</span>');
			var slideDisplayTotal  = $('<span class="slideDisplayNumber">'+numSlides+'</span>');
			var slideDisplay  = $('<div class="slideDisplay"/>');
			slideDisplay.append(slideDisplayNumber).append(slideDisplayDivider).append(slideDisplayTotal);
		var sliderPagination = $('<ul class="sliderPagination" />');
				
			var slider =new Swipe($this.get(0),{
				callback : function(e,pos){
					sliderPagination.children('li[data-swipe-id='+pos+']').addClass('active').siblings().removeClass('active');
				}
			});
			swipes.push(slider);
			
			for(var i=0;i<numSlides;i++){
				var pagintationListItem = $('<li data-swipe-id="'+i+'"></li>');
				var paginationLink = $('<a data-swipe-id="'+i+'">'+i+"</a>").click(function(){
					slider.slide($(this).data("swipe-id"));
					$(this).parent().addClass('active').siblings().removeClass('active');
				}).appendTo(pagintationListItem);
				
				sliderPagination.append(pagintationListItem).children('li:first-child').addClass('active');
			}
			controlsContainer.append(sliderPagination);
			controlsContainer.append(slideDisplay);
				});
				$("#view").addClass('loaded').bind(transitionEnd,function(){
	
					$(this).unbind(transitionEnd).addClass('transitionReleased');
					
				});
			
					setMainHeight();
				

			}		
	
			scrollCount++;
			

		
		
	}


function onWindowResize(){

		dh=$(document).height();
		if(!isiPhone){
			wh=$(this).height();
		}else{
			setiPhoneWindowHeight();
		}

		aboutHeight = $("#about").height() + 50;
		// alert ('aboutHeight is' + ' ' + aboutHeight);
		// alert ('dh is' + dh);
		// console.log( $("#mainDolly").height());
		
		if(Modernizr.touch){

			$('#header .page').height(wh);
			$('#home, #header').height(wh+aboutHeight/2);
			setMainDollyYOffset(-aboutHeight/2);
			
			// $('#main').height($('#mainDolly').height()-aboutHeight/2);
		}else{
			$('#header .page, #home').height(wh);
			// $('#main').height($('#mainDolly').height()-aboutHeight*0.8 + wh*0.1);
		}
		
		setMainHeight();
		onWindowScroll();
	
}

function setiPhoneWindowHeight(){
		 wh = (window.screen.height) - 20;
		//wh=460;
	
}
function setMainHeight(){
	if(!Modernizr.touch){
		 $('#main').height($('#mainDolly').height() - aboutHeight * 2.5 + wh * .1);
		//$('#main').height($('#mainDolly').height() - aboutHeight * 2.8 + wh * 0.15);
	}else{
		$('#main').height($('#mainDolly').height() - aboutHeight / 2 + wh * 0.15);
	}
}


