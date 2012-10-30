$(document).ready(function() {
	$('#input-search').keypress( function(e) {
		if(e.keyCode==13){
			var searchterm = $('#input-search').val();
			window.location = "UnpSearch.xsp?query=" + searchterm;
			event.preventDefault();
		}
	}); 
});