/**
 * Copyright 2013 Teamstudio Inc Licensed under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law
 * or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License
 */
var bLoaded = false;
$(window)
		.load(
				function() {
					if (!unpluggedserver) {
						try {
							for (i = 0; i < document.styleSheets.length; i++) {
								if (document.styleSheets.item(i).href
										.indexOf("defaultTheme.css") > -1
										|| document.styleSheets.item(i).href
												.indexOf("core.css") > -1) {
									void (document.styleSheets.item(i).disabled = true);
								}
							}
						} catch (e) {
						}
					}

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

					try {
						$(".opendialoglink").click( function(event) {
							openDialog($(this).attr('href'));
						});
					} catch (e) {

					}
					try{
						fixNavigatorBottomCorners();
					}catch(e){
						
					}
					try{
						FastClick.attach(document.body);
					}catch(e){
						
					}
					
					$(".footerTabtext").each(function(){
						if ($(this).height() > 15){
							$(this).parent().css("position", "relative");
							$(this).parent().css("top", "-7px");
						}
					});
					
					initHorizontalView();
					initDeleteable();
					initAutoComplete();
					
				});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

$(window).scroll( function() {
	if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		$(".loadmorebutton").click();
	}
});

window.addEventListener("orientationchange", setTimeout("changeorientation", 100), false);

function changeorientation(){
	alert("Orientation change");
	hideViewsMenu();
	initiscroll();
	initHorizontalView();
}

function allowFormsInIscroll() {
	[].slice.call(document.querySelectorAll('input, select, button, textarea'))
			.forEach(
					function(el) {
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

function loadmore(dbName, viewName, summarycol, detailcol, category, xpage,
		refreshmethod, photocol, collapserows, wrapsummarycol, ajaxload) {
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
				+ encodeURIComponent(detailcol) + "&photocol="
				+ encodeURIComponent(photocol) + "&collapserows="
				+ encodeURIComponent(collapserows) + "&category="
				+ encodeURIComponent(category) + "&xpage=" + xpage
				+ "&wrapsummarycol=" + encodeURIComponent(wrapsummarycol)
				+ "&dbName=" + dbName + "&refreshmethod=" + refreshmethod
				+ "&start=" + pos + "&ajaxload=" + ajaxload;
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
	thisArea.load(url.replace(" ", "%20") + " #contentwrapper",
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
				initDeleteable();
				initAutoComplete();
				initHorizontalView();
				return false;
			});
}

function saveDocument(formid, unid, viewxpagename, formname, parentunid, dbname) {
	try {
		scrollContent.scrollTo(0, -60, 0);
	} catch (e) {
	}
	var data = $(".customform :input").serialize();
	var url = 'UnpSaveDocument.xsp?unid=' + unid + "&formname=" + formname
			+ "&rnd=" + Math.floor(Math.random() * 1001);
	if (parentunid) {
		url += "&parentunid=" + parentunid;
	}
	if (dbname) {
		url += "&dbname=" + dbname;
	}
	var valid = validate();
	if (valid) {
		$.ajax( {
			type : 'POST',
			url : url,
			data : data,
			cache : false,
			encoding:"UTF-8",
			beforeSend : function() {
				console.log("About to open URL");
			}
		}).done( function(response) {
			console.log(response.length);
			if (response.length == 32) {
				// openDocument(
				// viewxpagename
				// + "?action=openDocument&documentId="
				// + response, "content");
				// initiscroll();
				$.blockUI();
				window.location.href = "UnpMain.xsp";
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
		}, "fast");
		// $("#content").fadeOut();
	} else {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");
		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "fast");
		// $("#content").fadeIn();
	}
}

function hideViewsMenu() {
	if (!$("#menuPane").hasClass("offScreen")) {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");
		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "fast");
	}
	// $("#content").fadeIn();
}

var firedrequests;
function loadPage(url, target, menuitem) {
	var thisArea = $("#" + target);
	thisArea.load(url, function() {

		if (firedrequests != null) {
			firedrequests = new Array();
		}
		initiscroll();
		initHorizontalView();
		initDeleteable();
		initAutoComplete();
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

function initDeleteable() {
	try {
		$('input.deletable').wrap('<span class="deleteicon" />').after(
				$('<span/>').click( function() {
					$(this).prev('input').val('').focus();
				}));
	} catch (e) {

	}
}

var swipers = null;
function initHorizontalView(){
	try{
		if (swipers != null){
			//We need to destroy the existing swipers and re-init
			for (var i=0; i<swipers.length; i++){
				swipers[i].destroy();
			}
		}
		swipers = new Array();
		$(".swiper-container").each(function(){
			//First we need to re-size the swipe area
			var items = $(this).find(".hviewitem").length;
			$(this).find(".swiper-slide").width((items * 140));
			//Now init the swiper
			var mySwiper = $(this).swiper({
				scrollContainer:true, 
				freeMode: true,
				freeModeFluid: true,
				momentumBounce: true
			});

			swipers.push(mySwiper);
		})
	}catch(e){
		
	}
}

function initAutoComplete() {
	// try{
	$(".autocomplete").each( function() {
		var thefield = $(this);
		var options = {
			serviceUrl : thefield.attr('auto-src')
		};
		var a = $(this).autocomplete(options);
	});
	// }catch(e){

	// }
}

var touchmovehandler = function(e) {
	e.preventDefault()
}

var scrollContent;
var scrollMenu;
function initiscroll() {
	// Register the letter click events
	$(".atozletter").click( function(event) {
		event.stopPropagation();
		if ($(this).hasClass("switchletterlist")){
			$(".atozpicker").toggle();
			$(".numberpicker").toggle();
		}else{
			jumpToLetter($(this), event);
		}
		return false;
	});
	if (unpluggedserver) {
		if (!getURLParameter("starttime")){
			document.addEventListener('touchmove', touchmovehandler);
		}
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
		} catch (e) {
		}
		try {
			scrollMenu = new iScroll('menu', {
				bounce : true,
				momentum : false
			});
		} catch (e) {
		}
		
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
											$(".acResults").hide();
										},
										onScrollEnd : function() {
											if (pullUpEl) {
												if (pullUpEl.className
														.match('flip')) {
													pullUpEl.className = 'loading';
													pullUpEl
															.querySelector('.pullUpLabel').innerHTML = 'Loading...';
													$(".loadmorebutton")
															.click();
												}
											}
										}
									});
							$(".atozpicker").show();
							return false;
						});
		$(".atozpicker").show();
	} else {
		$(".atozpicker").show();
	}
}

function jumpToLetter(letterelement, event) {
	var letter = letterelement.text();
	var list = $("#flatViewRowSet li").each( function() {
		var summary = $(this).find(".viewlistsummary").text();
		var firstletter = summary.substring(0, 1);
		if (firstletter >= letter) {
			if (unpluggedserver) {
				var el = $(this).attr("id").replace(/:/gi, "\\:");
				scrollContent.scrollToElement("#" + el, "0s");
			} else {
				$('html, body').animate( {
					scrollTop : $(this).offset().top - 60
				}, 500);
			}
			return false;
		}
	});
}

function openDialog(id) {
	if (id != null && id != "#"){
		$("#underlay" + id).css('display', 'block');
		$("#" + id).css('display', 'block');
		var boxes = $("div");
		boxes.click( function() {
			var el = $(id);
			var max = 0;
			boxes.each( function() {
				var z = parseInt($(this).css("z-index"), 10);
				max = Math.max(max, z);
			});
			el.css("z-index", max + 1);
		});
		initiscroll();
		initHorizontalView();
	}
}

function closeDialog(id) {
	$("#" + id).css('display', 'none');
	$("#underlay" + id).css('display', 'none');
	initiscroll();
	initHorizontalView();
}

function accordionLoadMore(obj, viewName, catName, xpage, dbname) {

	var thisArea = $(obj).nextAll(".summaryDataRow:first").children(
			".accordionRowSet");
	var pos = $(thisArea).find('li').length;
	thisArea.css('display', 'block');
	var thisUrl = "UnpAccordionViewList.xsp?chosenView="
			+ encodeURIComponent(viewName) + "&catFilter="
			+ encodeURIComponent(catName) + "&xpageDoc=" + xpage + "&start="
			+ pos + "&dbname=" + dbname;

	var tempHolder = $(obj).nextAll(".summaryDataRow:first").children(
			".summaryDataRowHolder");
	$(tempHolder).load(
			thisUrl + " #results",
			function() {
				$(thisArea).append($(".summaryDataRow li"));
				if ($(tempHolder).text().indexOf("NOMORERECORDS") > -1) {
					$(obj).nextAll(".summaryDataRow:first").children(
							".accLoadMoreLink").hide();
				} else {
					$(obj).nextAll(".summaryDataRow:first").children(
							".accLoadMoreLink").removeClass('hidden').show();
				}
				$(tempHolder).empty();
				try {
					scrollContent.refresh();
					scrollContent.scrollToElement($(obj));
				} catch (e) {
				}
			});

	$(obj).addClass("accordianExpanded");
	$(obj).nextAll(".summaryDataRow:first").children(".accLoadMoreLink").show();
	$(thisArea).append($(".summaryDataRow li"));

	//check if there's only 1 expanded category and set a class to create a rounded bottom border
	if ( $("#summaryList .categoryrow").length == 1 ) {
		$("#summaryList div.summaryDataRow ul.accordionRowSet li:last-child").addClass("roundedBottom");
	}
}

function fetchDetails(obj, viewName, catName, xpage, dbname) {
	$('.accordionRowSet').empty();
	$('.accLoadMoreLink').hide();

	console.log('Category: ' + catName);
	if ($(obj).hasClass("accordianExpanded")) {
		$(obj).nextAll('.summaryDataRow:first').children('.accordionRowSet')
				.slideUp('fast', function() {
					$(this).children().remove()
				});
		$(obj).removeClass("accordianExpanded");
		$(obj).nextAll('.summaryDataRow:first').children('.accLoadMoreLink')
				.hide();
	} else {
		$('.categoryRow').removeClass("accordianExpanded");
		accordionLoadMore(obj, viewName, catName, xpage, dbname);
	}
}

function fetchMoreDetails(obj, viewName, catName, xpage, dbname) {

	var objRow = $(obj).parent().parent().prev();
	accordionLoadMore(objRow, viewName, catName, xpage, dbname);
}

function syncAllDbs() {
	$.blockUI( {
		centerY : 0,
		css : {
			top : '10px',
			left : '10px',
			right : ''
		}
	});
	$.get("UnpSyncAll.xsp", function(data) {
		$.unblockUI();
		location.reload();
	});
}

function x$(idTag, param) { // Updated 18 Feb 2012
	idTag = idTag.replace(/:/gi, "\\:") + (param ? param : "");
	return ($("#" + idTag));
}

function doHViewFilter(language, year, primaryview, filterview, xpage, source, toplevelcategory){
	if (language == null){
		language = $(".languagelabel").text();
	}
	if (year == null){
		year = $(".yearlabel").text();
	}
	var thisArea = $("#repeatholder");
	var url = ("UnpHorizontalViewFilter.xsp?languagefilter=" + language + 
											"&yearfilter=" + year).replace(" ", "%20") + 
											"&primaryview=" + primaryview.replace(" ", "%20") + 
											"&filterview=" + filterview.replace(" ", "%20") + 
											"&xpage=" + xpage + 
											"&source=" + source + 
											"&toplevelcategory=" + toplevelcategory;
	thisArea.load(url.replace(" ", "%20") + " #repeatholder",
			function() {
				initiscroll();
				initHorizontalView();
				closeDialog('hviewPopup');
				return false;
			});
	$(".dropdown-menu").hide();
	$(".languagelabel").text(language);
	$(".yearlabel").text(year);
}

function loadMoreHorizontal(button, category, primaryview, filterview, xpage, source){
	var language = $(".languagelabel").text().replace(" ", "%20");
	var year = $(".yearlabel").text().replace(" ", "%20");
	var categoryrep = category.replace(" ", "-");
	categoryrep = categoryrep.replace("~", "-");
	var thisArea = $(".swiper-" + categoryrep);
	var itemcount = $(".swiper-slide-" + categoryrep + " .hviewitem").length;
	var url = "UnpHorizontalViewList.xsp?category=" + category.replace(" ", "%20") + 
										"&languagefilter=" + language + 
										"&yearfilter=" + year + 
										"&start=" + (itemcount - 1) + 
										"&primaryview=" + primaryview.replace(" ", "%20") + 
										"&filterview=" + filterview.replace(" ", "%20") + 
										"&xpage=" + xpage + 
										"&source=" + source;
	$.ajax({
	    url: url,
	    dataType: 'html',
	    success: function(html) {
	        $('.swiper-slide-' + categoryrep).append($('#loadmoreresults .hviewitem', $(html)));
	        if (html.indexOf("NOMORERECORDS") > -1){
	        	$(".loadmorebutton-" + categoryrep).hide();
	        }else{
	        	$(".loadmorebutton-" + categoryrep).appendTo($('.swiper-slide-' + categoryrep));
	        }
	        initHorizontalView();
	    }
	});
}

function openHViewDialog(xpage, source, unid){
	if (xpage.indexOf(".xsp") == -1){
		xpage += ".xsp";
	}
	var url = xpage + "?action=openDocument&documentId=" + unid;
	$("#hviewitemcontent").load(url.replace(" ", "%20") + " #" + source,
			function() {
				openDialog("hviewPopup");
				return false;
			});
}

function expandMenuItem(menuitem){
	$(".viewMenuItemSub").hide();
	$(".viewMenuItemSubSub").hide();
	//$(".navScrollArea .viewMenuItem img").prop("src", "unp/right-arrow-trans-white-large.png");
	if ($(menuitem).hasClass("viewMenuItemSub")){
		//We need to toggle a sub-sub menu
		var bFinishedCategory = false;
		$(menuitem).show();
		$(menuitem).nextAll().each(function(i){
			if (!$(this).hasClass("viewMenuItemSubSub") && !$(this).hasClass("viewMenuItemSub")){
				return false;
			}else if($(this).hasClass("viewMenuItemSub")){
				if ($(this).is(':visible')){
					//$(menuitem).find("img").prop("src", "unp/right-arrow-trans-white-large.png");
					bimg = true;
				}else{
					//$(menuitem).find("img").prop("src", "unp/down-arrow-trans-white-large.png");
					bimg = true;
				}
				$(this).toggle();
				bFinishedCategory = true;
			}else{
				if ($(this).hasClass("viewMenuItemSubSub") && !bFinishedCategory){
					if (i==0){
						if ($(this).is(':visible')){
							//$(menuitem).find("img").prop("src", "unp/right-arrow-trans-white-large.png");
							bimg = true;
						}else{
							//$(menuitem).find("img").prop("src", "unp/down-arrow-trans-white-large.png");
							bimg = true;
						}
					}
					$(this).toggle();
				}
			}
		});
		//Now we need to make sure that any previous sub categories are shown as well
		$(menuitem).prevAll().each(function(i){
			if (!$(this).hasClass("viewMenuItemSub") && !$(this).hasClass("viewMenuItemSubSub")){
				return false;
			}
			if($(this).hasClass("viewMenuItemSub")){
				if ($(this).is(':visible')){
					//$(menuitem).find("img").prop("src", "unp/right-arrow-trans-white-large.png");
					bimg = true;
				}else{
					//$(menuitem).find("img").prop("src", "unp/down-arrow-trans-white-large.png");
					bimg = true;
				}
				$(this).toggle();
			}
		})
	}else{
		//We need to toggle a sub menu
		$(menuitem).nextAll().each(function(i){
			if (!$(this).hasClass("viewMenuItemSub") && !$(this).hasClass("viewMenuItemSubSub")){
				return false;
			}else{
				if ($(this).hasClass("viewMenuItemSub")){
					if (i==0){
						if ($(this).is(':visible')){
							//$(menuitem).find("img").prop("src", "unp/right-arrow-trans-white-large.png");
							bimg = true;
						}else{
							//$(menuitem).find("img").prop("src", "unp/down-arrow-trans-white-large.png");
							bimg = true;
						}
					}
					$(this).toggle();
				}
			}
		});
	}
	fixNavigatorBottomCorners();
}
function fixNavigatorBottomCorners(){
	$(".navroundedbottom").removeClass("navroundedbottom");
	$(".navScrollArea .viewMenuItem").not(':hidden').last().addClass("navroundedbottom");
	$("#menuitems li a").removeClass("navroundedbottom");
	$("#menuitems li a").not(':hidden').last().addClass("navroundedbottom");
}

function hviewFavourite(xpage, unid){
	if (xpage.indexOf(".xsp") == -1){
		xpage += ".xsp";
	}
	var url = xpage + "?favorite=toggle&action=openDocument&documentId=" + unid;
	$("#hviewitemcontent").load(url.replace(" ", "%20") + " #results");
	$("[unid='" + unid + "'] .badge-favorite").toggle();
}

function hviewEmail(xpage, unid){
	$("#hviewdialogbuttons").toggle();
	$("#emailholder").toggle();	
}

function hviewEmailSend(xpage, unid){
	alert("This needs to be implemented");	
}

function hviewEmailCancel(xpage, unid){
	$("#hviewdialogbuttons").toggle();
	$("#emailholder").toggle();	
}

function dropdownToggle(element){
	if (element != null){
		$(element).next().toggle();
	}else{
		$(".dropdown-menu").toggle();
	}
}