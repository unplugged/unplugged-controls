$(document).ready(function() {
	$('#input-search').keyup( function() {
		$('table.data-row').css("display", "");
			$('ul.data-row').css("display", "");
			var searchterm = $('#input-search').val();
			if (searchterm.length > 2) {
				var nomatch = $('table.data-row:not(:contains("' + searchterm + '"))');
				nomatch.css("display", "none");
				var nomatch2 = $('ul.data-row:not(:contains("' + searchterm + '"))');
				nomatch2.css("display", "none");
			} else {
				$('table.data-row').css("display", "");
				$('ul.data-row').css("display", "");
			}
	});

	jQuery.expr[':'].contains = function(a, i, m) {
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
});