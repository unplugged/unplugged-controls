/**
 * Copyright 2013 Teamstudio Inc 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed 
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for 
 * the specific language governing permissions and limitations under the License
 */

$(window).load( function() {
	$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
});

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
	if (unpluggedserver){
		// Scroll content
		var content = document.querySelector('#wscontent > div.wsscroll');
		if (content) {
			//content_scroll = new iScroll(content);
		}
	}
	// Free some memory
	//document.removeEventListener('DOMContentLoaded', ready, false);
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

function setBadge(badgeid, value){
	$('span[badgeid="' + badgeid + '"]').html(value);
	$('span[badgeid="' + badgeid + '"]').show();
}