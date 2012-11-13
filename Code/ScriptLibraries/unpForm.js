$(window).load(function() {
	$(".datepicker").each(function(){
		console.log("Init date picker for " + $(this).attr("id"));
		var scroller = $(this).scroller({ 
			preset: 'date',
	        theme: 'default',
	        mode: 'scroller',
	        dateOrder: 'dd M yy',
	        dateFormat: 'dd M yy'});
	});
});