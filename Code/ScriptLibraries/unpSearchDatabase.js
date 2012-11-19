$(document).ready(function() {
	$('#input-search').keypress( function(e) {
		if(e.keyCode==13){
			event.preventDefault();
			var searchterm = $('#input-search').val();
			$.blockUI();
			window.location = searchPage + "?query=" + searchterm;
		}
	}); 
});

$(document).ready(function() {
	$('.searchButton').click(function (event){
		if($("#input-search").hasClass("hiddensearch")){
			$("#input-search").removeClass("hidden").addClass("input-search");
		}else{
			$("#input-search").removeClass("input-search").addClass("hiddensearch");
		}
		$('#input-search > input').focus(); });
});
