/**
 * 
 * Find more about the accordion at
 * http://cubiq.org/accordion
 *
 * Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 * Version 1.0 - Last updated: 2010.08.20
 * 
 */

(function(){
function accordion (el, scroll) {
	var that = this,
		top = 0,
		accordions, i, l;

	that.el = document.getElementById(el);
	that.scroll = scroll===true;

	// Get the wrappers
	that.wrappers = document.querySelectorAll('#' + el + ' > div');

	// Get the headers
	that.handles = document.querySelectorAll('#' + el + ' > div > div:first-child');

	// Get the accordions
	accordions = document.querySelectorAll('#' + el + ' > div > div:last-child');

	// Assign default styles
	for (i=0, l=that.wrappers.length; i<l; i++) {
		that.wrappers[i].style.top = top + 'px';
		that.wrappers[i].style.webkitTransitionProperty = '-webkit-transform';
		that.wrappers[i].style.webkitTransitionTimingFunction = 'cubic-bezier(0,0,0.25,1)';
		that.wrappers[i].style.webkitTransitionDuration = '0';
		that.wrappers[i].style.webkitTransform = translateOpen + '0,0' + translateClose;
		that.wrappers[i]._pos = i;
		top += that.wrappers[i].offsetHeight;
	}
	
	that.el.style.height = top + 'px';

	for (i=0, l=that.handles.length; i<l; i++) {
		that.handles[i].addEventListener('click', that, false);
	}

	for (i=0, l=accordions.length; i<l; i++) {
		accordions[i].style.webkitTransitionProperty = '-webkit-transform';
		accordions[i].style.webkitTransitionTimingFunction = 'cubic-bezier(0,0,0.25,1)';
		accordions[i].style.webkitTransitionDuration = '0';
		accordions[i].style.webkitTransform = translateOpen + '0,0' + translateClose;
	}
}

accordion.prototype = {
	handleEvent: function (e) {
		if (e.type == 'click') {
			this.toggle(e);
		} else if (e.type == 'webkitTransitionEnd') {
			this.transitionEnd(e);
		}
	},
	
	toggle: function (e) {
		var that = this,
			targetWrapper = e.currentTarget.parentNode,
			targetHandle = targetWrapper.querySelector('div:first-child'),
			targetAccordion = targetWrapper.querySelector('div:last-child'),
			openedWrapper = that.el.querySelector('.acOpen'),
			time = height = fullHeight = elTop = 0,
			openedAccordion, i, l,
			el = targetWrapper;

		height = targetAccordion.offsetHeight;
		time = Math.min(height + 100, 800) + 'ms';

		targetAccordion.style.top = targetHandle.offsetTop + targetHandle.offsetHeight - height + 'px';
		targetWrapper.style.height = height + targetHandle.offsetHeight + 'px';

		if (openedWrapper == targetWrapper) {
			height = 0;
		}

		targetAccordion.style.webkitTransform = translateOpen + '0,' + height + 'px' + translateClose;
		targetAccordion.style.webkitTransitionDuration = time;

		targetWrapper.className = 'acOpen';
		if (openedWrapper) {
			openedWrapper.className = 'acClose';

			openedAccordion = openedWrapper.querySelector('div:last-child');
			openedAccordion.style.webkitTransform = translateOpen + '0,0' + translateClose;
			openedAccordion.style.webkitTransitionDuration = time;
		}

		for (i=0, l=that.wrappers.length; i<l; i++) {
			fullHeight+= that.handles[i].offsetHeight;

			if (that.wrappers[i]._pos > targetWrapper._pos) {
				that.wrappers[i].style.webkitTransitionDuration = time;
				that.wrappers[i].style.webkitTransform = translateOpen + '0,' + height + 'px' + translateClose;
			} else {
				that.wrappers[i].style.webkitTransitionDuration = time;
				that.wrappers[i].style.webkitTransform = translateOpen + '0,0' + translateClose;
			}
		}
		
		that.el.style.height = fullHeight + height + 'px';

		document.addEventListener('webkitTransitionEnd', that, false);

		if (that.scroll) {
			do {
				elTop += el.offsetTop;
			} while (el = el.offsetParent);
			setTimeout(function () { that.timedScroll(elTop, 500); }, 0);
//			setTimeout(function () { window.scrollTo(0, targetWrapper.offsetTop); }, 0);
		}
	},
	
	transitionEnd: function (e) {
		var that = this,
			closedWrapper = that.el.querySelector('.acClose');

		document.removeEventListener('webkitTransitionEnd', that, false);
		
		if (closedWrapper) {
			closedWrapper.className = '';
			closedWrapper.style.height = '';
		}
	},
	
	timedScroll: function (destination, runtime) {
		var that = this,
			startPosition = window.scrollY,
			startTime = (new Date).getTime(),
			PI = Math.PI;

		if (that.scrollTimer) {
			clearInterval(that.scrollTimer);
			that.scrollTimer = null;
		}

		that.scrollTimer = setInterval(function () {
			var now = (new Date).getTime(),
				newPosition;

			if (now >= startTime+runtime) {
				if (that.scrollTimer) {
					clearInterval(that.scrollTimer);
					that.scrollTimer = null;
				}

				window.scrollTo(0, destination);

				return;
			}

			now = (now - startTime) / runtime;
			newPosition = Math.round(((-Math.cos(now*PI)/2) + 0.5) * (destination-startPosition) + startPosition);
			window.scrollTo(0, newPosition);
		}, 34);
	}
};

// Is translate3d compatible?
var has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
	translateOpen = 'translate' + (has3d ? '3d(' : '('),
	translateClose = has3d ? ',0)' : ')';

// Expose iScroll to the world
window.accordion = accordion;
})();