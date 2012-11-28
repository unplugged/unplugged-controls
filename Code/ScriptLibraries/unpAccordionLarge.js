

function accordionLoadMore(obj, viewName, catName, xpage){
	
	var thisArea = $(obj).nextAll(".summaryDataRow:first").children(".accordionRowSet");		
	console.log("thisArea = " + $(thisArea).attr('class'));
	var pos = $(thisArea).find('li').length;
	console.log("pos length= " + $(thisArea).find('li').length);
	thisArea.css('display','block');
	var thisUrl = "UnpAccordionViewList.xsp?chosenView=" + encodeURIComponent(viewName) + "&catFilter=" + encodeURIComponent(catName) + "&xpageDoc=" + xpage + "&start=" + pos; 
	
	var tempHolder = $(obj).nextAll(".summaryDataRow:first").children(".summaryDataRowHolder");
	$(tempHolder).load(thisUrl + " #results", function(){
		$(thisArea).append($(".summaryDataRow li"));
		if ($(tempHolder).text().indexOf("NOMORERECORDS") > -1){
			console.log("NUMBER OF RECORDS is > -1");
			$(obj).nextAll(".summaryDataRow:first").children(".loadMoreLink").hide();
		}else{
			console.log("NUMBER OF RECORDS is -1");
			$(obj).nextAll(".summaryDataRow:first").children(".loadMoreLink").show();	
		}
		$(tempHolder).empty();
	});
	
	
	$(obj).addClass("accordianExpanded");
	$(obj).nextAll(".summaryDataRow:first").children(".loadMoreLink").show();

}

function fetchDetails(obj, viewName, catName, xpage)
{	
	console.log('View: ' + viewName);
	//console.log("Object = " + obj);
	//Reset category
	$('.accordionRowSet').empty();
	$('.loadMoreLink').hide();
	
	console.log('Category: ' + catName);
	if($(obj).hasClass("accordianExpanded")){
		$(obj).nextAll('.summaryDataRow:first').children('.accordionRowSet').slideUp('fast', function(){ $(this).children().remove()});
		$(obj).removeClass("accordianExpanded");
		$(obj).nextAll('.summaryDataRow:first').children('.loadMoreLink').hide();
	}
	else{
		accordionLoadMore(obj, viewName, catName, xpage);
	}
}

function fetchMoreDetails(obj, viewName, catName, xpage){
	
	console.log("Load more button tapped...");
	var objRow = $(obj).parent().parent().prev();
	accordionLoadMore(objRow, viewName, catName, xpage);	
}