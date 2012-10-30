$(document).ready(function() {
	$('#input-search').keyup( function() {
		$('li.data-row').css("display", "none");
		var searchterm = $('#input-search').val();
		console.log("Searching for: \"" + searchterm + "\"");
		if (searchterm.length > 2) {
			var nomatch2 = $('li.data-row:icontains("' + searchterm + '")');
			console.log("Got " + nomatch2.length + " results");
			nomatch2.css("display", "");
		} else {
			//$('ul.data-row').css("display", "");
		}
	});

	jQuery.expr[':'].icontains = function(a, i, m) {
		console.log("icontains(" + a + ", " + i + ", " + m + ")");
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
});