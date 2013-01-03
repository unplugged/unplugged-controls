/**
 * Copyright 2013 Teamstudio Inc 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed 
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for 
 * the specific language governing permissions and limitations under the License
 */

$(document).ready(function() {
	$('#input-search').keypress( function(e) {
		if(e.keyCode==13){
			event.preventDefault();
		}
	}); 

	$('#input-search').keyup( function() {
		$('li.data-row').css("display", "none");
		$(".loadmorelink").css("display", "none");
		var searchterm = $('#input-search').val();
		if (searchterm.length > 2) {
			var match = $('li.data-row:icontains("' + searchterm + '")');
			match.css("display", "");
		} else {
			$('li.data-row').css("display", "");
			$(".loadmorelink").css("display", "");
		}
		try {
			initiscroll();
		}catch(e){
			try{
				scrollContent.destroy();
				$(".iscrollcontent").each(function(){
					scrollContent = new iScroll($(this).attr("id"));
				});
			}catch(e){}
		}
	});

	jQuery.expr[':'].icontains = function(a, i, m) {
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
});

$(document).ready(function() {
	$('.searchButton').click(function (event){
		if($("#input-search").hasClass("hiddensearch")){
			$("#input-search").removeClass("hiddensearch").addClass("input-search");
		}else{
			$("#input-search").removeClass("input-search").addClass("hiddensearch");
		}
		$('#input-search > input').focus(); });
});