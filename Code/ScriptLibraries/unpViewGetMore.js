var firedrequests = new Array();
function stopViewSpinner(){
	$("#loadmorelink").disabled = false;
	$("#loadmorespinner").hide();
}

function loadmore(){
	try{
		$("#loadmorelink").disabled = true;
		$("#loadmorespinner").show();
		setTimeout("stopViewSpinner()", 5000);
		var itemlist = $("#flatViewRowSet li");
		var pos = itemlist.length - 1;
		for (var i=0; i<firedrequests.length; i++){
			if (firedrequests[i] == pos){
				$("#loadmorelink").disabled = false;
				$("#loadmorespinner").hide();
				return;
			}
		}
		firedrequests.push(pos);
		var thisArea = $(".summaryDataRow");
		thisArea.load("UnpFlatViewList.xsp?chosenView=" + viewName + "&start=" + pos + " #results", function(){
			$("#flatViewRowSet").append($(".summaryDataRow li"));
			$(".summaryDataRow").empty();
			$("#loadmorelink").disabled = false;
			$("#loadmorespinner").hide();
			return false;
		});		
	}catch(e){
		//Do nothing
	}
}

function autoGetMore() {
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    var scrolledtonum = getScrollTop() + myHeight + 2;
    var heightofbody = document.body.offsetHeight;
    if (scrolledtonum >= heightofbody) {
        loadmore();
    }
}
window.onscroll = autoGetMore;

function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    }else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}