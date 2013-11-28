---
layout: 300-post
title:  "UnpWorkspace"
date:   2013-12-01 17:00
categories: "300"
---

To display a Workspace similar to the home page of Unplugged

![Workspace iPad](http://teamstudio.s3.amazonaws.com/images/workspace-ipad.png)
![Workspace iPhone](http://teamstudio.s3.amazonaws.com/images/workspace-iphone.png)

This controls requires a view data source to be defined on the containing XPage, and the data source name must be "dbs". The view columns which are used by the control are defined in the Custom Properties.

# Usage

Drag the control onto your XPage and complete the following Custom Properties:

* badgeidcol: the column title in the "dbs" view which contains an ID which you can later use to populate the badge
* imgurlcol: the column title in the "dbs" view which contains a URL to the icon for the workspace chiclet
* labelcol: the column title in the "dbs" view which contains the label for the workspace chiclet
* linkurlcol: the column title in the "dbs" view which contains the URL which will be opened when the workspace chiclet is tapped
* alertlevel: the alert level which will be display in the top right of the workspace (options are normal, elevated and highalert
* headerinfo: a multi value property which allows you to place text headings in the top left of the workspace. In the example below there are three entries. HTML markup is allowed in the text.

<script src="https://gist.github.com/whitemx/7528028.js"></script>

To use the badges there are two steps. First provide the BadgeID for each individual chiclet on the workspace. Then you will need to use this ID when you want to populate the badge like so:

<script src="https://gist.github.com/whitemx/7528042.js"></script>

The above example assumes that you have two chiclets on your workspace which you want to display badges for, MyRole and CommsGuide. The setBadge function locates the badge, populates the value you send to it and then shows the badge in the top right of the chiclet.

# Required Resources
When you use the Accordion custom control make sure you have the following resources in your application:

* unp/jquery-1.7.2.min.js
* unp/jquery.blockUI.min.js
* unp/iScroll.min.js
* workspace.js
* unplugged.css