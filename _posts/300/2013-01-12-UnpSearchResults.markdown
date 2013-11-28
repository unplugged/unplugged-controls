---
layout: 300-post
title:  "UnpSearchResults"
date:   2013-12-01 17:00
categories: "300"
---

# Function
This control displays search results by looking up key values from a view. The results are displayed in a similar way to the [[unpFlatView]] control. The XPage UnpFlatViewList.xsp must be copied from the Controls pack into your application (no editing of this XPage is required)

![Search Results iPad](http://teamstudio.s3.amazonaws.com/images/searchresults-ipad.png)
![Search Results iPhone](http://teamstudio.s3.amazonaws.com/images/searchresults-iphone.png)

The control will work when integrated with [[unpScrollableArea]]

# Usage
The view which is being searched should have it's first column sorted, lowercase-d and the contents exploded to include as many words as you want to search on. The search facility is not full text but rather it is similar to the "Find" facility in a Notes view.

If the control is used with the [[unpHeader]] control, the control assumes that it is called with a URL Paramter of "query" which is the search term being used. The UnpHeader control must also have the search property set to 'database' and the serachPage property set to the xpage this control is used in

Drag the control onto your XPage and complete the following Custom Properties:

* detailColumn: the secondary column of data to display (this is the column title)
* insetData: whether the view should be indented with rounded corners or flush to the "edge" of it's container
* summaryColumn: the main column of data to display (this is the column title)
* title: the title to display above the view data
* viewName: the name of the view to search
* viewsearch: the query which will be passed to the view to search with
* xpageDoc: the name of the XPage to open documents in the view with

<script src="https://gist.github.com/whitemx/7528000.js"></script>

# Troubleshooting
If you use this control and enter text into the search input field and either; the screen flashes and all data is returned, or; the results page contains no entries when it should check the following:
1. That the view used has the first column sorted and is not categorized
2. That the 'show multiple values as separate entries' box is checked
3. That the contents of the first column are contained in a @LowerCase( ... ) function
4. There are no hidden columns in the view
5. Ensure UnpFlatView.xsp is copied from the Controls pack into your application

The recommended view structure to create a new view with 3 columns; first being the key to search on, second being the data for the 'summaryColumn' property and the third (if necessary) being the data for the property 'detailsColumn'

# Required Resources
When you use the custom control make sure that you have the following resources in your application:
* unp/jquery-1.7.2.min.js
* unp/jquery.blockUI.min.js
* unp/iScroll.min.js
* unplugged.js
* unpCommon.jss
* unplugged.css
* unp/right-arrow-circle.png
* UnpFlatViewControl.xsp