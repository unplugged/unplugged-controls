---
layout: 300-post
title:  "UnpHorizontalView"
date:   2013-12-01 17:00
categories: "300"
---

This mimics the iTunes Store style of horizontal data display. We created the control to display an icon with a title which can then be clicked to load a dialog which shows more information about the document.

![Horizontal View iPad](http://teamstudio.s3.amazonaws.com/images/horizontalview-ipad.png)
![Horizontal View iPhone](http://teamstudio.s3.amazonaws.com/images/horizontalview-iphone.png)

The control will work when integrated with unpScrollableArea

# Usage
Drag the control onto your XPage and complete the following Custom Properties:

<dl class="dl-horizontal">
	<dt>dialogxpage</dt><dd>the dialog loads an XPage using an Ajax request to get the data about the document being clicked, this is where you specify the name of the XPage which shows that data</dd>
	<dt>favoritesonly</dt><dd>One of the functions offered is to mark a document as a favorite, if you want to display just the favorites then set this option to "yes"</dd>
	<dt>filterview<dt><dd>We offer two combo boxes to allow the user to filter content by year and language. The supporting view for these filters needs to be specified here. The view itself has to be of a very specific design. We recommend using the design in the Sampler application of the view "Documents Filter"</dd>
	<dt>primaryview</dt><dd>To get the initial grouping of documents, this view provides the source data. Again this view has a very specific design which we recommend copying. The view in the Sampler application is called "Documents"</dd>
	<dt>sourcediv</dt><dd>this is the name of the div in the dialog XPage, where data will be loaded from</dd>
	<dt>subtitle</dt><dd>an area where some descriptive text can be entered about the page</dd>
	<dt>title</dt><dd>The title for the page</dd>
	<dt>toplevelcategory</dt><dd>the name of the category which will be display on the page. for the main page, this would be "All" if you're using the same design as our "Documents" view</dd>
</dl>

This XML shows an example of the configuration of the main page.

<script src="https://gist.github.com/whitemx/7527954.js"></script>

If you also want to support filtering, then you'll also want to include the UnpHorizontalViewFilter XPage in your application.

The "Load More" function requires the presence of the XPage called UnpHorizontalViewList, it is this which is used by the control to perform Ajax requests to get each chunk of data to display to the user.

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.