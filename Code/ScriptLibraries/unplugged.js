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
					if (isAndroid()){
						$("#menuitems").css("position", "relative");
					}

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
					try {
						fixNavigatorBottomCorners();
					} catch (e) {

					}
					try {
						FastClick.attach(document.body);
					} catch (e) {

					}

					$(".footerTabtext").each( function() {
						if ($(this).height() > 15) {
							$(this).parent().css("position", "relative");
							$(this).parent().css("top", "-7px");
						}
					});

					initHorizontalView();
					initDeleteable();
					initAutoComplete();
					initHideFooter();
					initRichText();
					initReaderButtons();
					$(document).ajaxStop( function() {
						initHideFooter();
						initRichText();
						initReaderButtons();
					});
				});


function initReaderButtons() {
	if ($(".fontsizebuttons").length > 0) {
		$(".input-search-frame").hide();
	} else {
		$(".input-search-frame").show();
	}
}

var oldiscrollbottom = "";
function initHideFooter() {
	try {
		$(':input, textarea, select').on('focus', function() {
			$(".footer").hide();
			oldiscrollbottom = $(".iscrollcontent").css("bottom");
			$(".iscrollcontent").css("bottom", "0px");
		});
		$(':input, textarea, select').on('blur', function() {
			$(".footer").show();
			$("iscrollbottom").css("bottom", oldiscrollbottom);
			window.scrollTo(0, 1);
		});
	} catch (e) {

	}
}

function isAndroid(){
	return /android/i.test(navigator.userAgent.toLowerCase());
}

var editor = null;
var rtfield;
function initRichText() {
	//Placeholder for future improvements
}

function htmlDecode(input) {
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp(
			'[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [
			, "" ])[1].replace(/\+/g, '%20'))
			|| null;
}

window.addEventListener("orientationchange", setTimeout("changeorientation",
		100), false);

function changeorientation() {
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

			if ($("#pullUp").hasClass('loading')) {
				$("#pullUp").removeClass("loading");
				$(".pullUpLabel").text("Pull up to load more...");
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
			function(data, status, xhr) {
				if (status=="error") {
					alert("An error occurred:\n\n" + xhr.status + " " + xhr.statusText + "\n\n" + $(data).text());
					return false;
				}else{
					if (firedrequests != null) {
						firedrequests = new Array();
					}
	
					unp.storePageRequest(url);
	
					initiscroll();
					if (url.indexOf("editDocument") > -1
							|| url.indexOf("newDocument") > -1) {
						allowFormsInIscroll();
					}
					initDeleteable();
					initAutoComplete();
					initHorizontalView();
					if ($("#input-search").hasClass("input-search")) {
						$(".iscrollcontent").css("top", "90px");
					}
					return false;
				}
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
			encoding : "UTF-8",
			beforeSend : function() {
				console.log("About to open URL");
			}
		}).done(
				function(response) {
					console.log(response.length);
					if (response.length == 32) {
						openDocument(
								viewxpagename
										+ "?action=openDocument&documentId="
										+ response, "content");
						initiscroll();
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
		}, "fast", function(){
			if (isAndroid()){
				$("#menuitems").css("position", "fixed");
			}
		});
	} else {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");
		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "fast", function(){
			if (isAndroid()){
				$("#menuitems").css("position", "relative");
			}			
		});
	}
}

function hideViewsMenu() {
	if (!$("#menuPane").hasClass("offScreen")) {
		$("#menuPane").removeClass("onScreen").addClass("offScreen");

		$("#menuPane").animate( {
			"left" : "-=700px"
		}, "fast", function(){
			if (isAndroid()){
				$("#menuitems").css("position", "relative");
			}
		});
	}
	// $("#content").fadeIn();
}

var firedrequests;
function loadPage(url, target, menuitem, pushState) {

	var _pushState = true;
	if (arguments.length >= 4) {
		_pushState = pushState;
	}

	var thisArea = $("#" + target);
	thisArea.load(url, function(data, status, xhr) {
		if (status=="error") {
			alert("An error occurred:\n\n" + xhr.status + " " + xhr.statusText + "\n\n" + $(data).text());
			return false;
		}else{
	
			if (firedrequests != null) {
				firedrequests = new Array();
			}
	
			if (_pushState) {
				unp.storePageRequest(url);
			}
	
			initiscroll();
			initHorizontalView();
			initDeleteable();
			initAutoComplete();
			return false;
		}
	});
	if (_pushState) {
		var menuitems = $("#menuitems li");
		menuitems.removeClass("viewMenuItemSelected");
		menuitems.removeClass("active");
		menuitems.addClass("viewMenuItem");
		$(".menuitem" + menuitem).removeClass("viewMenuItem");
		$(".menuitem" + menuitem).addClass("viewMenuItemSelected");
		$(".menuitem" + menuitem).addClass("active");
		hideViewsMenu();
	}
}

function openPage(url, target) {
	$.blockUI();
	window.location.href = url;
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
function initHorizontalView() {
	try {
		if (swipers != null) {
			// We need to destroy the existing swipers and re-init
			// for ( var i = 0; i < swipers.length; i++) {
			// swipers[i].destroy();
			// }
		}
		swipers = new Array();
		$(".swiper-container").each( function() {
			// First we need to re-size the swipe area
				var items = $(this).find(".hviewitem").length;
				$(this).find(".swiper-slide").width((items * 140));
				// Now init the swiper
				// var mySwiper = $(this).swiper( {
				// scrollContainer : true,
				// freeMode : true,
				// freeModeFluid : true,
				// momentumBounce : true
				// });

				// swipers.push(mySwiper);
			})
	} catch (e) {

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
	e.preventDefault();
}

var scrollContent;
var scrollMenu;
function initiscroll() {
	// Register the letter click events
	$(".atozletter").click( function(event) {
		event.stopPropagation();
		if ($(this).hasClass("switchletterlist")) {
			$(".atozpicker").toggle();
			$(".numberpicker").toggle();
		} else {
			jumpToLetter($(this), event);
		}
		return false;
	});
	
	bouncefix.add(document.getElementById("menuitems"));
	bouncefix.add(document.querySelector('.iscrollcontent'));
	
	try {
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
	} catch (e) {
	}
	$('.iscrollcontent')
			.bind(
					'scroll',
					function() {
						if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
							if (pullUpEl) {
								pullUpEl.className = 'flip';
								pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
								if (pullUpEl.className.match('flip')) {
									pullUpEl.className = 'loading';
									pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
									$(".loadmorebutton").click();
								}
							}
						}
					})
	$(".atozpicker").show();
}

function jumpToLetter(letterelement, event) {
	$('.iscrollcontent').animate( {
		scrollTop : 0
	}, 0);
	var letter = letterelement.text();
	var list = $("li.categoryRowFixed").each(
			function() {
				var summary = $(this).find("span").text();
				var firstletter = summary.substring(0, 1);
				if (firstletter == letter) {
					console.log("we need to jump to " + firstletter
							+ " because it's equal to " + letter);
					$('.iscrollcontent').animate( {
						scrollTop : $(this).offset().top - 60
					}, 500);
					return false;
				} else if (firstletter > letter) {
					console.log("we need to jump to " + firstletter
							+ " because it's greater than " + letter);
					$('.iscrollcontent').animate( {
						scrollTop : $(this).offset().top - 120
					}, 500);
					return false;
				} else {
					console.log("we don't need to jump to " + firstletter
							+ " because it's less than " + letter);
				}
			});
}

function openDialog(id) {
	if (id != null && id != "#") {
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

	// check if there's only 1 expanded category and set a class to create a
	// rounded bottom border
	if ($("#summaryList .categoryrow").length == 1) {
		$("#summaryList div.summaryDataRow ul.accordionRowSet li:last-child")
				.addClass("roundedBottom");
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

function doHViewFilter(language, year, primaryview, filterview, xpage, source,
		toplevelcategory) {
	if (language == null) {
		language = $(".languagelabel").text();
	}
	if (year == null) {
		year = $(".yearlabel").text();
	}
	var thisArea = $("#repeatholder");
	var url = ("UnpHorizontalViewFilter.xsp?languagefilter=" + language
			+ "&yearfilter=" + year).replace(" ", "%20")
			+ "&primaryview="
			+ primaryview.replace(" ", "%20")
			+ "&filterview="
			+ filterview.replace(" ", "%20")
			+ "&xpage="
			+ xpage
			+ "&source="
			+ source
			+ "&toplevelcategory="
			+ toplevelcategory;
	thisArea.load(url.replace(" ", "%20") + " #repeatholder", function() {
		initiscroll();
		initHorizontalView();
		closeDialog('hviewPopup');
		return false;
	});
	$(".dropdown-menu").hide();
	$(".languagelabel").text(language);
	$(".yearlabel").text(year);
}

function loadMoreHorizontal(button, category, primaryview, filterview, xpage,
		source) {
	var language = $(".languagelabel").text().replace(" ", "%20");
	var year = $(".yearlabel").text().replace(" ", "%20");
	var categoryrep = category.replace(" ", "-");
	categoryrep = categoryrep.replace("~", "-");
	var thisArea = $(".swiper-" + categoryrep);
	var itemcount = $(".swiper-slide-" + categoryrep + " .hviewitem").length;
	var url = "UnpHorizontalViewList.xsp?category="
			+ category.replace(" ", "%20") + "&languagefilter=" + language
			+ "&yearfilter=" + year + "&start=" + (itemcount - 1)
			+ "&primaryview=" + primaryview.replace(" ", "%20")
			+ "&filterview=" + filterview.replace(" ", "%20") + "&xpage="
			+ xpage + "&source=" + source;
	$.ajax( {
		url : url,
		dataType : 'html',
		success : function(html) {
			$('.swiper-slide-' + categoryrep).append(
					$('#loadmoreresults .hviewitem', $(html)));
			if (html.indexOf("NOMORERECORDS") > -1) {
				$(".loadmorebutton-" + categoryrep).hide();
			} else {
				$(".loadmorebutton-" + categoryrep).appendTo(
						$('.swiper-slide-' + categoryrep));
			}
			initHorizontalView();
		}
	});
}

function openHViewDialog(xpage, source, unid) {
	if (xpage.indexOf(".xsp") == -1) {
		xpage += ".xsp";
	}
	var url = xpage + "?action=openDocument&documentId=" + unid;
	$("#hviewitemcontent").load(url.replace(" ", "%20") + " #" + source,
			function() {
				openDialog("hviewPopup");
				return false;
			});
}

function expandMenuItem(menuitem) {
	$(".viewMenuItemSub").hide();
	$(".viewMenuItemSubSub").hide();
	if ($(menuitem).hasClass("expanded")) {
		// We need to leave everything collapsed
	} else if ($(menuitem).hasClass("viewMenuItemSub")) {
		// We need to toggle a sub-sub menu
		var bFinishedCategory = false;
		$(menuitem).show();
		$(menuitem).nextAll().each(
				function(i) {
					if (!$(this).hasClass("viewMenuItemSubSub")
							&& !$(this).hasClass("viewMenuItemSub")) {
						return false;
					} else if ($(this).hasClass("viewMenuItemSub")) {
						//$(this).toggle();
						bFinishedCategory = true;
					} else {
						if ($(this).hasClass("viewMenuItemSubSub")
								&& !bFinishedCategory) {
							$(this).toggle();
						}
					}
				});
		// Now we need to make sure that any previous sub categories are shown
		// as well
		$(menuitem).prevAll().each(
				function(i) {
					if (!$(this).hasClass("viewMenuItemSub")
							&& !$(this).hasClass("viewMenuItemSubSub")) {
						return false;
					}
					if ($(this).hasClass("viewMenuItemSub")) {
						$(this).toggle();
					}
				})
	} else {
		// We need to toggle a sub menu
		var bClickedFirst = true;
		var bFoundSubSub = false;
		$(menuitem).nextAll().each(
				function(i) {
					if (!$(this).hasClass("viewMenuItemSub")
							&& !$(this).hasClass("viewMenuItemSubSub")) {
						bFoundSubSub = true;
						return false;
					} else {
						if ($(this).hasClass("viewMenuItemSub")) {
							if (!bFoundSubSub){
								if (!bClickedFirst) {
									$(this).click();
									bClickedFirst = true;
								}
								$(this).toggle();
							}
						}
					}
				});
	}
	if ($(menuitem).hasClass("expanded")) {
		$(".viewMenuItem").removeClass("expanded");
	} else {
		$(".viewMenuItem").removeClass("expanded");
		$(menuitem).addClass("expanded");
	}
	fixNavigatorBottomCorners();
}
function fixNavigatorBottomCorners() {
	$(".navroundedbottom").removeClass("navroundedbottom");
	$(".navScrollArea .viewMenuItem").not(':hidden').last().addClass(
			"navroundedbottom");
	$("#menuitems li a").removeClass("navroundedbottom");
	$("#menuitems li a").not(':hidden').last().addClass("navroundedbottom");
}

function hviewFavourite(xpage, unid) {
	if (xpage.indexOf(".xsp") == -1) {
		xpage += ".xsp";
	}
	var url = xpage + "?favorite=toggle&action=openDocument&documentId=" + unid;
	$("#hviewitemcontent").load(url.replace(" ", "%20") + " #results");
	$("[unid='" + unid + "'] .badge-favorite").toggle();
	closeDialog("hviewPopup");
}

function hviewDownloadNow() {
	alert("This feature has not been enabled");
}

function hviewDownloadLater() {
	alert("This feature has not been enabled");
}

function hviewEmail(xpage, unid) {
	$("#hviewdialogbuttons").toggle();
	$("#emailholder").toggle();
}

function hviewEmailSend(xpage, unid) {
	alert("This needs to be implemented");
}

function hviewEmailCancel(xpage, unid) {
	$("#hviewdialogbuttons").toggle();
	$("#emailholder").toggle();
}

function dropdownToggle(element) {
	if (element.text.indexOf("Language") > -1){
		$("#yeardropdownlink").next().hide();
	}else if(element.text.indexOf("Year") > -1){
		$("#dropdownlink").next().hide();
	}
	if (element != null) {
		$(element).next().toggle();
	} else {
		$(".dropdown-menu").toggle();
	}
}

// create unp namespace object (if not created before)
if (!unp) {

	var unp = {

		_firstLoad : true,

		storePageRequest : function(url) {

			this._firstLoad = false;

			if (url.indexOf("#") > -1) {
				url = url.substring(0, url.indexOf(" #"));
			}
			if (url.indexOf("?") == -1) {
				url += "?";
			}
			url += "&history=true";
			history.pushState(null, "", url);
			console.log("pushed " + url);

		}

	}

	$(window).bind(
			"popstate",
			function() {
				if (!unp._firstLoad) {
					loadPage(location.href + " #contentwrapper", 'content',
							null, false, false);
				}
			});

}

function increaseFontSize(button) {
	$(".typographyreadcontent").find("*").each(
			function() {
				$(this).css("font-size",
						(parseInt($(this).css("font-size"), 10) + 2) + "px");
				if (parseInt($(this).css("line-height"), 10) <= parseInt(
						$(this).css("font-size"), 10)) {
					$(this).css(
							"line-height",
							(parseInt($(this).css("line-height"), 10) + 2)
									+ "px");
				}
			});
}
function decreaseFontSize(button) {
	$(".typographyreadcontent").find("*").each(
			function() {
				$(this).css("font-size",
						(parseInt($(this).css("font-size"), 10) - 2) + "px");
				if (parseInt($(this).css("line-height"), 10) > 24) {
					$(this).css(
							"line-height",
							(parseInt($(this).css("line-height"), 10) - 2)
									+ "px");
				}
			});
}

/*!
 * v0.0.3
 * Copyright (c) 2013 Jarid Margolin
 * bouncefix.js is open sourced under the MIT license.
 */ 

;(function (window, document) {

// Define module
var bouncefix = {
  Fix: Fix,
  cache: {}
};  

//
// Add/Create new instance
//
bouncefix.add = function (className) {
  if (!this.cache[className]) {
    this.cache[className] = new this.Fix(className);
  }
};

//
// Delete/Remove instance
//
bouncefix.remove = function (className) {
  if (this.cache[className]) {
    this.cache[className].remove();
    delete this.cache[className];
  }
};
//
// Class Constructor - Called with new BounceFix(el)
// Responsible for setting up required instance
// variables, and listeners.
//
function Fix(className) {
  // If there is no element, then do nothing  
  if(!className) { return false; }
  this.className = className;

  // The engine
  this.startListener = new EventListener(document, {
    evt: 'touchstart',
    handler: this.touchStart,
    context: this
  }).add();

  // Cleanup
  this.endListener = new EventListener(document, {
    evt: 'touchend',
    handler: this.touchEnd,
    context: this
  }).add();
}

//
// touchstart handler
//
Fix.prototype.touchStart = function (evt) {
  this.target = utils.getTargetedEl(evt.target, this.className);
  if (this.target) {
    // If scrollable, adjust
    if (utils.isScrollable(this.target)) { return utils.scrollToEnd(this.target); }
    // Else block touchmove
    this.endListener = new EventListener(this.target, {
      evt: 'touchmove',
      handler: this.touchMove,
      context: this
    }).add();
  }
};

//
// If this event is called, we block scrolling
// by preventing default behavior.
//
Fix.prototype.touchMove = function (evt) {
  evt.preventDefault(); 
};

//
// On touchend we need to remove and listeners
// we may have added.
//
Fix.prototype.touchEnd = function (evt) {
  if (this.moveListener) {
    this.moveListener.remove();
  }
};

//
// touchend handler
//
Fix.prototype.remove = function () {
  this.startListener.remove();
  this.endListener.remove();
};
// Define module
var utils = {};

//
// Search nodes to find target el. Return if exists
//
utils.getTargetedEl = function (el, className) {
  while (true) {
    if (el.classList.contains(className)) { break; }
    if ((el = el.parentElement)) { continue; }
    break;
  }
  return el;
};

//
// Return true or false depending on if content
// is scrollable
//
utils.isScrollable = function (el) {
  return (el.scrollHeight > el.offsetHeight);
};

//
// Keep scrool from hitting end bounds
//
utils.scrollToEnd = function (el) {
  var curPos = el.scrollTop,
      height = el.offsetHeight,
      scroll = el.scrollHeight;
  
  // If at top, bump down 1px
  if(curPos <= 0) { el.scrollTop = 1; }

  // If at bottom, bump up 1px
  if(curPos + height >= scroll) {
    el.scrollTop = scroll - height - 1;
  }
};
//
// Class used to work with addEventListener. Allows
// context to be specified on handler, and provides
// a method for easy removal.
//
function EventListener(el, opts) {
  // Make args available to instance
  this.evt = opts.evt;
  this.el = el;
  // Default
  this.handler = opts.handler;
  // If context passed call with context
  if (opts.context) {
    this.handler = function (evt) {
      opts.handler.call(opts.context, evt);
    };
  }
}

//
// Add EventListener on instance el
//
EventListener.prototype.add = function () {
  this.el.addEventListener(this.evt, this.handler, false);
};

//
// Removes EventListener on instance el
//
EventListener.prototype.remove = function () {
  this.el.removeEventListener(this.evt, this.handler);
};

// Expose to window
if (typeof window !== 'undefined') { window.bouncefix = bouncefix; }

})(window, document);