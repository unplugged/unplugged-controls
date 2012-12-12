/**
 *
 * Setup events
 *
 */

document.addEventListener('DOMContentLoaded', ready, false);
window.addEventListener('load', loaded, false);
//window.addEventListener('orientationchange', orientation, false);

function BlockMove(event) {
	// Tell Safari not to move the window.
	event.preventDefault();
}


/**
 *
 * Scrollers globals
 *
 */

var apps_scroll;
	

/**
 *
 * On DOM Ready
 *
 */

function ready () {	
	// Scroll content
	var content = document.querySelector('#content > div.scroll');
	if (content) {
		content_scroll = new iScroll(content, { hScroll:false, vScrollbar:false });
	}

	// Free some memory
	document.removeEventListener('DOMContentLoaded', ready, false);
}


/**
 *
 * On page Load
 *
 */

function loaded () {
	// Free some memory
	window.removeEventListener('load', loaded, false);
}

/**MCH: some helpers */
function updateSelect(selId, optVal, items) {
	var selElem = document.getElementById(selId);
	var selIndex = items[optVal];
	if (null == selIndex) {
			selIndex = 0;
	}
	selElem.selectedIndex = selIndex;
}

function allowFormsInIscroll(){
  [].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el){
    el.addEventListener(('ontouchstart' in window)?'touchstart':'mousedown', function(e){
      //console.log('Preventing event from bubbling up to iScroll, as it would then remove it.');
      e.stopPropagation();
    })
  })
}
