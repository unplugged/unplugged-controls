$( document ).ready(function() {
	$(".nav li").each(function(){
		if (window.location.href.indexOf($(this).find("a").prop("href")) > -1){
			$(this).addClass("active");
		}
	});
});