var firedrequests = new Array();
function stopViewSpinner(){
	$("#loadmorelink").disabled = false;
	$("#loadmorespinner").hide();
}

function loadmore(viewName, summarycol, detailcol, category){
	//console.log("loading more for " + viewName + ", " + summarycol + ", " + detailcol);
	try{
		$("#loadmorelink").hide();
		$("#loadmorespinner").show();
		setTimeout("stopViewSpinner()", 5000);
		var itemlist = $("#flatViewRowSet li");
		var pos = itemlist.length - 1;
		for (var i=0; i<firedrequests.length; i++){
			if (firedrequests[i] == pos){
				$("#loadmorelink").show();
				$("#loadmorespinner").hide();
				return;
			}
		}
		firedrequests.push(pos);
		var thisArea = $(".summaryDataRow");
		var url = "UnpFlatViewList.xsp?chosenView=" + encodeURIComponent(viewName) + "&summarycol=" + encodeURIComponent(summarycol)
					+ "&detailcol=" + encodeURIComponent(detailcol) + "&category=" + encodeURIComponent(category) + "&start=" + pos;
		thisArea.load(url + " #results", function(){
			$("#flatViewRowSet").append($(".summaryDataRow li"));
			if ($(".summaryDataRow").text().indexOf("NOMORERECORDS") > -1){
				$("#pullUp").hide();
			}else{
				$("#loadmorelink").show();
			}
			$("#loadmorespinner").hide();
			$(".summaryDataRow").empty();
			try{
				scrollContent.refresh();
			}catch(e){}
			return false;
		});		
	}catch(e){
		//Do nothing
	}
}

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		$(".loadmorebutton").click();
	}
});
