window.addEventListener("orientationchange", function() {
	toggleViewsMenu();
	initiscroll();
}, false);

$(window).load(function() {
	initiscroll();
	
	$(".viewlink").addEventListener("click", function(){
		var box = new AjaxLoader($(this));
	})
});

function loadPage(url, target, menuitem){
	var thisArea = $("#" + target);
	var box = new AjaxLoader($('#' + target));
	thisArea.load(url, function(){
		box.remove();
		if (firedrequests != null){
			firedrequests = new Array();
		}
		initiscroll();
		return false;
	});		
	var menuitems = $("#menuitems li");
	menuitems.removeClass("viewMenuItemSelected");
	menuitems.addClass("viewMenuItem");
	$(".menuitem" + menuitem).removeClass("viewMenuItem");
	$(".menuitem" + menuitem).addClass("viewMenuItemSelected");
	toggleViewsMenu();
}

function initiscroll(){
	document.addEventListener('touchmove', function (e){e.preventDefault()});
	//Initialise any iScroll that needs it
	try{
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
	}catch(e){}
	try{
		scrollContent.destroy();
	}catch(e){}
	$(".iscrollcontent").each(function(){
		scrollContent = new iScroll($(this).attr("id"), {
			useTransition: true,
			onRefresh: function () {
				if (pullUpEl){
					if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
					}
				}
			},
			onScrollMove: function () {
				if (pullUpEl){
					if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
						this.maxScrollY = pullUpOffset;
					}
				}
			},
			onScrollEnd: function () {
				if (pullUpEl){
					if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
						$(".loadmorebutton").click();
					}
				}
			}
		});
	});
}
	

function AjaxLoader (el, options) {
	var defaults = {
		bgColor 		: '#fff',
		duration		: 200,
		opacity			: 0.7,
		classOveride 	: false
	}
	this.options 	= jQuery.extend(defaults, options);
	this.container 	= $(el);
	this.init = function() {
		var container = this.container;
		this.remove();
		var overlay = $('<div></div>').css({
				'background-color': this.options.bgColor,
				'opacity':this.options.opacity,
				'width':container.width(),
				'height':container.height(),
				'position':'absolute',
				'top':'0px',
				'left':'0px',
				'z-index':99999
		}).addClass('ajax_overlay');
		if (this.options.classOveride) {
			overlay.addClass(this.options.classOveride);
		}
		container.append(
			overlay.append(
				$('<div></div>').addClass('ajax_loader')
			).fadeIn(this.options.duration)
		);
    };
	this.remove = function(){
		var overlay = this.container.children(".ajax_overlay");
		if (overlay.length) {
			overlay.fadeOut(this.options.classOveride, function() {
				overlay.remove();
			});
		}
	}
    this.init();
}