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
