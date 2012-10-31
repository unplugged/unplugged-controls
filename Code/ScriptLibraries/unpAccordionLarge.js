
function fetchDetails(obj, viewName, catName)
{	
	//console.log('View: ' + viewName);
	//console.log('Category: ' + catName);
	if($(obj).hasClass("accordianExpanded")){
		//$(obj).nextAll('.summaryDataRow:first').children('#results').remove();
		$(obj).nextAll('.summaryDataRow:first').children('#results').slideUp('slow', function(){ $(this).remove()});
		$(obj).removeClass("accordianExpanded");
	}
	else{
		var thisArea = $(obj).next(".summaryDataRow");
		encodedCat = encodeURIComponent(catName);
		thisArea.load("UnpAccordionViewList.xsp?chosenView=" + viewName + "&catFilter=" + encodedCat + " #results");
		$(obj).addClass("accordianExpanded");
	}
}
function fetchDoc(thisUnid){
	window.location("/SafetySnapshotChecklist.xsp?action=openDocument&documentId=" + thisUnid);	
}