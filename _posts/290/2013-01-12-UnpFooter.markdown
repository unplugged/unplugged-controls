---
layout: 290-post
title:  "UnpFooter"
date:   2013-12-01 17:00
categories: "290"
---

A simple footer bar which will display three things. Bottom left is a Sync button which will replicate the current application. In the center is the last date / time the application was replicated. The button on the bottom right will create a new document using the name of the XPage specified in the Custom Properties.

*Need to insert images here*

For mobile web applications the sync button and the 'updated' timestamp will not display.

# Usage
Drag the custom control onto your XPage and set the newDocTarget property to point to the XPage which you want to use for creating new documents. You can set the newDocLoadType property to decide whether to use Ajax or a full page load when the new button is pressed. The default is Ajax.

Alternatively you can set the "settingsurl" property and the Settings button will appear in the bottom right. You cannot have the New and Settings buttons display at the same time.

You can decide what sort of sync will execute when the sync button is pressed. The default is to sync the current database, but you can also choose to sync all databases which are on the device or to hide the sync button altogether.

Custom Properties:
<dl class="dl-horizontal">
	<dt>newDocLoadType</dt><dd>You can choose to load new documents using Ajax or a full page load depending on your requirements</dd>
	<dt>newDocTarget</dt><dd>The name of the XPage you want to load</dd>
	<dt>settingsurl</dt><dd>If you want to display a settings button instead of the new button, populate the URL you want to load here</dd>
	<dt>synctype</dt><dd>you can specify whether sync should be enabled, just for the current database or for all databases</dd>
</dl>

```xml
<unp:unpFooter newDocTarget="EmployeeEdit.xsp" synctype="currentdb"
	newDocLoadType="ajax">
</unp:unpFooter>
```

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.