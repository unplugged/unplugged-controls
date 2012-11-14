$(window).load( function() {
	allowFormsInIscroll();
});

function allowFormsInIscroll() {
	[].slice.call(document.querySelectorAll('input, select, button, textarea')).forEach(function(el) {
		el.addEventListener(('ontouchstart' in window) ? 'touchstart' : 'mousedown',
			function(e) {
				e.stopPropagation();
			})
		})
}