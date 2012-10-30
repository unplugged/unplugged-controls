$(document).ready(function() {
	$('#input-search').keypress( function(e) {
		if(e.keyCode==13){
			event.preventDefault();
			var searchterm = $('#input-search').val();
			window.location = searchPage + "?query=" + searchterm;
		}
	}); 
});