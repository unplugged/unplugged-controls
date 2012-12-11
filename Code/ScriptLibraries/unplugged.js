$(window).load( function() {

	$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
	allowFormsInIscroll();

	initiscroll();
	$("#menupane").addClass("offScreen");
	$('.viewsButton').unbind('click');
	$('.viewsButton').click( function(event) {
		toggleViewsMenu();
		return false;
	});
	try {
		$(".viewlink").each( function() {
			$(this).addEventListener("click", function() {
				$.blockUI();
			});
		});
	} catch (e) {
	}
	
	try{
		$(".opendialoglink").click( function (event){
			openDialog($(this).attr('href'));
		});
	}catch(e){
		
	}
});

$(window).scroll( function() {
	if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		$(".loadmorebutton").click();
	}
});

window.addEventListener("orientationchange", function() {
	hideViewsMenu();
	initiscroll();
}, false);

function allowFormsInIscroll() {
	[].slice.call(document.querySelectorAll('input, select, button, textarea')).forEach(function(el) {
		el.addEventListener(
				('ontouchstart' in window) ? 'touchstart'
						: 'mousedown', function(e) {
					e.stopPropagation();
				})
	});
}

var firedrequests = new Array();
function stopViewSpinner() {
	$(".loadmorelink").disabled = false;
	$("#loadmorespinner").hide();
}

function loadmore(viewName, summarycol, detailcol, category, xpage,
		refreshmethod) {
	try {
		$(".loadmorelink").hide();
		$("#loadmorespinner").show();
		setTimeout("stopViewSpinner()", 5000);
		var itemlist = $("#flatViewRowSet li");
		var pos = itemlist.length - 1;
		for ( var i = 0; i < firedrequests.length; i++) {
			if (firedrequests[i] == pos) {
				$(".loadmorelink").show();
				$("#loadmorespinner").hide();
				return;
			}
		}
		firedrequests.push(pos);
		var thisArea = $(".summaryDataRow");
		var url = "UnpFlatViewList.xsp?chosenView="
				+ encodeURIComponent(viewName) + "&summarycol="
				+ encodeURIComponent(summarycol) + "&detailcol="
				+ encodeURIComponent(detailcol) + "&category="
				+ encodeURIComponent(category) + "&xpage=" + xpage
				+ "&refreshmethod=" + refreshmethod + "&start=" + pos;
		thisArea.load(url + " #results", function() {
			$("#flatViewRowSet").append($(".summaryDataRow li"));
			if ($(".summaryDataRow").text().indexOf("NOMORERECORDS") > -1) {
				$("#pullUp").hide();
				$(".loadmorelink").hide();
				$("#loadmorespinner").hide();
			} else {
				$("#pullUp").show();
				$(".loadmorelink").show();
				$("#loadmorespinner").hide();
			}
			$(".summaryDataRow").empty();
			try {
				scrollContent.refresh();
			} catch (e) {
			}
			return false;
		});
	} catch (e) {
		// Do nothing
	}
}

function openDocument(url, target) {
	// $.blockUI();
	// document.location.href = url;
	var thisArea = $("#" + target);
	thisArea.load(url + " #contentwrapper",
			function() {

				if (firedrequests != null) {
					firedrequests = new Array();
				}
				initiscroll();
				if (url.indexOf("editDocument") > -1
						|| url.indexOf("newDocument") > -1) {
					allowFormsInIscroll();
					try {
						if ($('.richtextfield').val().indexOf("<") > -1) {
							var val = $($('.richtextfield').val()).text();
							$('.richtextfield').val(val);
						}
					} catch (e) {
					}
					
				}
				return false;
			});
}

function saveDocument(formid, unid, viewxpagename, formname, parentunid) {
	scrollContent.scrollTo(0, -60, 0);
	var data = $(".customform :input").serialize();
	var url = 'UnpSaveDocument.xsp?unid=' + unid + "&formname=" + formname
			+ "&rnd=" + Math.floor(Math.random() * 1001);
	if (parentunid){
		url += "&parentunid=" + parentunid;
	}
	var valid = validate();
	if (valid) {
		$.ajax( {
			type : 'POST',
			url : url,
			data : data,
			cache : false,
			beforeSend : function() {
				console.log("About to open URL");
			}
		}).done(
				function(response) {
					/**
					 * At the moment we have to go back to the home page
					 * because iScroll breaks if keyboard has been displayed
					 */
					console.log(response.length);
					if (response.length == 32) {
						openDocument(
								viewxpagename
										+ "?action=openDocument&documentId="
										+ response, "content");
						initiscroll();
					//	$.blockUI();
					//	window.location.href = "UnpMain.xsp";
					} else {
						alert(response);
					}
				});
	} else {
		return false;
	}
}

function validate() {
	var valid = true;
	$(".required").each( function() {
		if ($(this).val() == "") {
			var label = $("label[for='" + $(this).attr('id') + "']");
			alert("Please complete " + label.text());
			$(this).focus();
			valid = false;
		}
	})
	return valid;
}

function toggleViewsMenu() {
	if ($("#menuPane").hasClass("offScreen")) {
		$("#menuPane").removeClass("offScreen").addClass("onScreen");
		$("#menuPane").animate( {
			"left" : "+=700px"
		}, "slow");
	} else {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");
		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "slow");
	}
}

function hideViewsMenu() {
	if (!$("#menuPane").hasClass("offScreen")) {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");
		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "slow");
	}
}

var firedrequests;
function loadPage(url, target, menuitem) {
	var thisArea = $("#" + target);
	thisArea.load(url, function() {

		if (firedrequests != null) {
			firedrequests = new Array();
		}
		initiscroll();
		return false;
	});
	var menuitems = $("#menuitems li");
	menuitems.removeClass("viewMenuItemSelected");
	menuitems.addClass("viewMenuItem");
	$(".menuitem" + menuitem).removeClass("viewMenuItem");
	$(".menuitem" + menuitem).addClass("viewMenuItemSelected");
	hideViewsMenu();
}

function openPage(url, target) {
	$.blockUI();
	document.location.href = url;
}

var scrollContent;
var scrollMenu;
function initiscroll() {
	document.addEventListener('touchmove', function(e) {
		e.preventDefault()
	});
	// Initialise any iScroll that needs it
	try {
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
	} catch (e) {
	}
	try {
		scrollContent.destroy();
		delete scrollContent;
	} catch (e) {
	}
	
	try {
		scrollMenu.destroy();
		delete scrollMenu;
	}catch(e){
	}
	try{
		scrollMenu = new iScroll('menu', {bounce: true, momentum: false});
	}catch(e){}
	
	$(".iscrollcontent")
			.each(
					function() {
						scrollContent = new iScroll(
								$(this).attr("id"),
								{
									useTransition : true,
									onRefresh : function() {
										if (pullUpEl) {
											if (pullUpEl.className
													.match('loading')) {
												pullUpEl.className = '';
												pullUpEl
														.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
											}
										}
									},
									onScrollMove : function() {
										if (pullUpEl) {
											if (this.y < (this.maxScrollY - 5)
													&& !pullUpEl.className
															.match('flip')) {
												pullUpEl.className = 'flip';
												pullUpEl
														.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
												this.maxScrollY = this.maxScrollY;
											} else if (this.y > (this.maxScrollY + 5)
													&& pullUpEl.className
															.match('flip')) {
												pullUpEl.className = '';
												pullUpEl
														.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
												this.maxScrollY = pullUpOffset;
											}
										}
									},
									onScrollEnd : function() {
										if (pullUpEl) {
											if (pullUpEl.className
													.match('flip')) {
												pullUpEl.className = 'loading';
												pullUpEl
														.querySelector('.pullUpLabel').innerHTML = 'Loading...';
												$(".loadmorebutton").click();
											}
										}
									}
								});
					});
}

function openDialog(id){
	$(id).css('display', 'block');
	$("#adminCover").css('display', 'block');
	initiscroll();
}

function closeDialog(id){
	$(id).css('display', 'none');
	$("#adminCover").css('display', 'none');
	initiscroll();
}


function accordionLoadMore(obj, viewName, catName, xpage){
	
	var thisArea = $(obj).nextAll(".summaryDataRow:first").children(".accordionRowSet");		
	var pos = $(thisArea).find('li').length;
	thisArea.css('display','block');
	var thisUrl = "UnpAccordionViewList.xsp?chosenView=" + encodeURIComponent(viewName) + "&catFilter=" + encodeURIComponent(catName) + "&xpageDoc=" + xpage + "&start=" + pos; 
	
	var tempHolder = $(obj).nextAll(".summaryDataRow:first").children(".summaryDataRowHolder");
	$(tempHolder).load(thisUrl + " #results", function(){
		$(thisArea).append($(".summaryDataRow li"));
		if ($(tempHolder).text().indexOf("NOMORERECORDS") > -1){
			$(obj).nextAll(".summaryDataRow:first").children(".accLoadMoreLink").hide();
		}else{
			$(obj).nextAll(".summaryDataRow:first").children(".accLoadMoreLink").removeClass('hidden').show();	
		}
		$(tempHolder).empty();
		try{
			initiscroll();
		}catch(e){}
	});
	
	
	$(obj).addClass("accordianExpanded");
	$(obj).nextAll(".summaryDataRow:first").children(".accLoadMoreLink").show();

}

function fetchDetails(obj, viewName, catName, xpage)
{	
	$('.accordionRowSet').empty();
	$('.accLoadMoreLink').hide();
	
	console.log('Category: ' + catName);
	if($(obj).hasClass("accordianExpanded")){
		$(obj).nextAll('.summaryDataRow:first').children('.accordionRowSet').slideUp('fast', function(){ $(this).children().remove()});
		$(obj).removeClass("accordianExpanded");
		$(obj).nextAll('.summaryDataRow:first').children('.accLoadMoreLink').hide();
	}
	else{
		$('.categoryRow').removeClass("accordianExpanded");
		accordionLoadMore(obj, viewName, catName, xpage);
	}
}

function fetchMoreDetails(obj, viewName, catName, xpage){
	
	var objRow = $(obj).parent().parent().prev();
	accordionLoadMore(objRow, viewName, catName, xpage);	
}