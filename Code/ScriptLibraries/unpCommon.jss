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
