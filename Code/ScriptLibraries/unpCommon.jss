/**
 * Copyright 2013 Teamstudio Inc 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed 
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for 
 * the specific language governing permissions and limitations under the License
 */

/*
 * Returns the name of the current XPage e.g. UnpMain.xsp
 */
function getCurrentXPage(){
	if (!viewScope.containsKey("currentxpage")){
		var url = context.getUrl().toString();
		url = @Left(url, ".xsp") + ".xsp";
		if (url.indexOf(".nsf/") > -1){
			url = @Right(url, ".nsf/");
		}else{
			url = @Right(url, ".unp/");
		}
		viewScope.currentxpage = url;
	}
	return viewScope.currentxpage;
}

/*
 * Returns the current db path in the format "/dir/mydb.nsf"
 */
function getDbPath(){
	if (!applicationScope.containsKey("dbpath")){
		applicationScope.dbpath = "/" + @ReplaceSubstring(database.getFilePath(), "\\", "/");
	}
	return applicationScope.dbpath;
}

function isUnpluggedServer(){
	if (!applicationScope.containsKey("unpluggedserver")){
		try{
			if (null != UnpluggedLib) {
				applicationScope.unpluggedserver = true;
				applicationScope.dominoserver = false;
			}else{
				applicationScope.unpluggedserver = false;
				applicationScope.dominoserver = true;
			}
		}catch(e){
			applicationScope.unpluggedserver = false;
			applicationScope.dominoserver = true;
		}
	}
	return applicationScope.unpluggedserver;
}

function $A( object ){
	if( typeof object === 'undefined' || object === null ){ return []; }
	if( typeof object === 'string' ){ return [ object ]; }
	if( typeof object.toArray !== 'undefined' ){
		return object.toArray();
	}
	if( object.constructor === Array ){ return object; }  
	return [ object ];
}

function isEmpty( input ) {
	if (input == null || typeof input == 'undefined') {
	    return true;    
	}
	if (typeof input == 'string') {
	    return input.equals("");
	} else if (input.toString != null) {
	    return input.toString().equals("");
	}
	return false;
}

function timeSince(datetime){
	var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    if (interval == 1){
    	return interval + " minute ago";	
    }
    return "less than a minute ago";
}

function getFavorites(){
	var favorites = session.getEnvironmentString("ro.favorites." + @LowerCase(@ReplaceSubstring(database.getFilePath(), "\\", "")), true) + ",";
	if (favorites == null || favorites == ""){
		return new Array();
	}else if(favorites.indexOf(",") > -1){
		return $A(favorites.split(","));
	}else{
		return $A(favorites);
	}
}
function setFavorites(favoritesarray){
	session.setEnvironmentVar("ro.favorites." + @LowerCase(@ReplaceSubstring(database.getFilePath(), "\\", "")), @Implode(@Trim(favoritesarray), ","), true);
	sessionScope.favorites = null;
}
function getDownloaded(){
	var downloaded = session.getEnvironmentString("ro.downloaded." + @LowerCase(@ReplaceSubstring(database.getFilePath(), "\\", "")), true);
	if (downloaded == null || downloaded == ""){
		return new Array();
	}else if(downloaded.indexOf(",") > -1){
		return downloaded.split(",");
	}else{
		return [downloaded];
	}
}
function setDownloaded(downloadedarray){
	session.setEnvironmentVar("ro.downloaded." + @LowerCase(@ReplaceSubstring(database.getFilePath(), "\\", "")), @Implode(@Trim(downloadedarray), ","), true);
	sessionScope.downloaded = null;
}