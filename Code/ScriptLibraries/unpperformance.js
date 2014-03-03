$(window).load( function() {
	$( document ).ajaxComplete(function() {
		start();
	});
	var message;
	if (!bLoaded && unp.getURLParameter("starttime")) {
		var starttime = parseInt(unp.getURLParameter("starttime"), 10);
		var endtime = Date.now();
		bLoaded = true;
		endtime = Date.now();
		test("Initial Page Load Time took " + (endtime - starttime) + "ms", 1, function(){
			ok(true);
		});
		test("open first menu item", 1, function(){
			stop();
			$("#menuitems li").first().click();
			ok(true);
		});
		test("open first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		test("edit document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("open second menu item", 1, function(){
			stop();
			$("#menuitems li:nth-child(2)").first().click();
			ok(true);
		});
		test("open the first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		test("edit the document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("open last menu item", 1, function(){
			stop();
			$("#menuitems li").last().click();
			ok(true);
		});
		test("open the first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		
		test("edit the document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("compose new document", 1, function(){
			stop();
			$(".newButton").click();
			ok(true);
		});
		test("open first menu item", 1, function(){
			stop();
			$("#menuitems li").first().click();
			ok(true);
		});
		test("open first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		test("edit document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("open second menu item", 1, function(){
			stop();
			$("#menuitems li:nth-child(2)").first().click();
			ok(true);
		});
		test("open the first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		test("edit the document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("open last menu item", 1, function(){
			stop();
			$("#menuitems li").last().click();
			ok(true);
		});
		test("open the first document in view", 1, function(){
			stop();
			$("#flatViewRowSet li.data-row").first().click();
			ok(true);
		});
		
		test("edit the document", 1, function(){
			stop();
			$(".editButton").first().click();
			ok(true);
		});
		test("compose new document", 1, function(){
			stop();
			$(".newButton").click();
			
			try{
				$(".searchlabel").remove();
				$(".input-search-frame").remove();
				$(".viewsButton").remove();
				var html = $(".iHeader").html();
				html += $("#qunit").html();
				html += $("#extraresources").html();
				html.replace(/(\r\n|\n|\r)/g,"");
				$("body").html(html);
				$("#qunit").height("100%");
				$("#qunit").css("overflow", "scroll");
				document.removeEventListener('touchmove', touchmovehandler);
			}catch(e){
				
			}
			ok(true);
			
		});
		
	}
});

function log(message){
	if (unpluggedserver) {
		alert(message);
	} else {
		console.log(message);
	}	
}