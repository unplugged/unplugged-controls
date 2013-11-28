---
layout: 300-post
title:  "UnpFlatView"
date:   2013-12-01 17:00
categories: "300"
---

If you want to display a flat (or non categorized) view then this is the control you will need to use. 

![Flat View iPad](http://teamstudio.s3.amazonaws.com/images/flatview-ipad.png)
![Flat View iPhone](http://teamstudio.s3.amazonaws.com/images/flatview-iphone.png)

The control will work when integrated with unpScrollableArea

# Usage
Drag the control onto your XPage and complete the following Custom Properties:

<dl class="dl-horizontal">
	<dt>ajaxload</dt><dd>Yes/No (default yes) controls how documents are opened. If Yes they are loaded via Ajax which is faster, but there are some circumstances (when uploading files for example or opening documents in another database) when you need to load a new page.</dd>
	<dt>categoryfilter</dt><dd>text to apply a "show single category" filter to a categorized view.</dd>
	<dt>collapseRows</dt><dd>if set to yes the detail data will be hidden by default and the user can then tap to expand. If this is enabled, the document cannot be opened.</dd>
	<dt>dbName</dt><dd>optional parameter to specify which database the view you want to open is located in. The database path should be delimited with forward slashes (e.g. mydir/mydb.nsf)</dd>
	<dt>detailColumn</dt><dd>the secondary column of data to display (this is the column title)</dd>
	<dt>enableAZPicker</dt><dd>yes/no (default no) set when using the [[UnpAZPicker]] control with this UnpFlatView control. Lists a-z down the right side for users to navigate faster to entries beginning with the selected letter</dd>
	<dt>insetData</dt><dd>whether the view should be indented with rounded corners or flush to the "edge" of it's container</dd>
	<dt>numberofrows</dt><dd>the number of rows of data to display (default is 20)</dd>
	<dt>photoColumn</dt><dd>(since 1.4.0) the name of the column which contains the URL pointing to image to display in view. Leave blank for no image</dd>
	<dt>position</dt><dd>whether the view will position itself to work in conjunction with the [[UnpViewsList]] control. By default it will, choose left-aligned if you are not using the UnpViewsList control</dd>
	<dt>refreshmethod</dt><dd>the way that the user can load the next chunk of data. Options are pull, button or none</dd>
	<dt>summaryColumn</dt><dd>the main column of data to display (this is the column title)</dd>
	<dt>title</dt><dd>the title to display above the view data</dd>
	<dt>viewName</dt><dd>the name of the view to get data from</dd>
	<dt>wrapsummarytext</dt><dd>By default long text will be truncated with "...". If you set this property to yes, the text will wrap for 2 lines before truncating.</dd>
	<dt>xpageDoc</dt><dd>the name of the XPage to open documents in the view with</dd>
</dl>

<script src="https://gist.github.com/whitemx/7527828.js"></script>

The "Load More" function requires the presence of the XPage called UnpFlatViewList, it is this which is used by the control to perform Ajax requests to get each chunk of data to display to the user.

The "enableAZPicker" requires the UnpAZPicker control to be included within the div id="content" but outside the UnpScrollableArea control

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.