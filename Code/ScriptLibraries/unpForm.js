$(window).load( function() {
	allowFormsInIscroll();
});

function allowFormsInIscroll() {
	[].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el) {
		el.addEventListener(('ontouchstart' in window) ? 'touchstart' : 'mousedown',
			function(e) {
				console.log('Preventing event from bubbling up to iScroll, as it would then remove it.');
				e.stopPropagation();
			})
		})
}