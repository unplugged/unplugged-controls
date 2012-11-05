function loadPage(url, target, menuitem){
	var thisArea = $("#" + target);
	var box = new AjaxLoader($('body'));
	thisArea.load(url, function(){
		box.remove();
		if (firedrequests != null){
			firedrequests = new Array();
		}
		//Initialise any iScroll that needs it
		$(".iscrollcontent").each(function(){
			scrollContent = new iScroll($(this).attr("id"));
		});
		return false;
	});		
	var menuitems = $("#menuitems li");
	menuitems.removeClass("viewMenuItemSelected");
	menuitems.addClass("viewMenuItem");
	$(".menuitem" + menuitem).removeClass("viewMenuItem");
	$(".menuitem" + menuitem).addClass("viewMenuItemSelected");
	toggleViewsMenu();
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