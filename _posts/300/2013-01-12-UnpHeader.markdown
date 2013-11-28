---
layout: 300-post
title:  "UnpHeader"
date:   2013-12-01 17:00
categories: "300"
---

# Function
A simple control which displays a fixed header at the top of your pages. We generally assume that you will use this control on your pages, and because of this, we include most resources which are required by other controls in here.

![Header iPad](http://teamstudio.s3.amazonaws.com/images/header-ipad.png)
![Header iPhone](http://teamstudio.s3.amazonaws.com/images/header-iphone.png)

# Usage
Drag the custom control onto your XPage and then complete the Custom Properties:

<dl class="dl-horizontal">
	<dt>backButtonText</dt><dd>The label which will appear on the Back button (leave blank to hide button)</dd>
	<dt>backButtonURL</dt><dd>The URL which will be opened when the Back button is pressed</dd>
	<dt>headerHomeLink</dt><dd>Sets the navigation to an xpage from the home icon (top right). By default this is the Unplugged workspace. This is only recommended to be changed if the app is a mobile web app and not running on Unplugged </dd>
	<dt>search</dt><dd>Defines the type of search you want to enable, options are "none", the searching will be disabled. "local" will search across view data (for example in the [[unpFlatView]]). "database" will open a new page and pass a "query" URL Parameter to allow you to search the full database using the [[unpSearchResults]] control</dd>
	<dt>searchPage</dt><dd>Only required if the search property is set to "database"</dd>
	<dt>title</dt><dd>the title to display at the top of the page</dd>
	<dt>viewsButton</dt><dd>boolean to decide whether to display the Views button which will slide in the [[unpViewsList]] control if you are using it.</dd>
</dl>

Below is an example of a standard header used in our Sampler application

<script src="https://gist.github.com/whitemx/7527945.js"></script>

# Required Resources
When you use the Header custom control make sure that you have the following resources in your application:
* /unp/jquery-2.0.3.min.js
* /unp/fastclick.js
* /unp/jquery.blockUI.min.js
* /unp/jquery.autocomplete.js
* /unplugged.js
* /unpDialog.css
* /unpCommon.jss