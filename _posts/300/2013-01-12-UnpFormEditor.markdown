---
layout: 300-post
title:  "UnpFormEditor"
date:   2013-12-01 17:00
categories: "300"
---

This control is a wrapper to handle the validation and saving of your document which is in edit mode.

![Form Editor iPad](http://teamstudio.s3.amazonaws.com/images/formeditor-ipad.png)
![Form Editor iPhone](http://teamstudio.s3.amazonaws.com/images/formeditor-iphone.png)

# Usage

Firstly set up a document data binding on your XPage and make sure it is called document1

Drag the control onto your XPage and set the following Custom Properties:

<dl class="dl-horizontal">
  <dt>dbName</dt><dd>optional parameter to specify which database the document you want to open is located in. The database path should be delimited with forward slashes (e.g. mydir/mydb.nsf). Leave blank for the same db </dd>
  <dt>formname</dt><dd>the name of the Notes form which the document will be saved as (for when creating a new document)</dd>
  <dt>position</dt><dd>if a [[UnpNavigator]] is used the position needs to be set to 'menu-aligned' to allow for the navigator column to be displayed on tablets in landscape mode. 'left-aligned' will set the data to the left of the device regardless of the navigator included or not</dd>
  <dt>showbuttons</dt><dd>boolean setting to control whether to display standard buttons. 
full refresh, so should contain Header / Footer / Navigator as required.</dd>
  <dt>title</dt><dd>the title to display at the top of the page</dd>
  <dt>viewxpagename</dt><dd>the name of the XPage to open after clicking the Save button. *At the moment this property is not being used* (it will be opened with ?action=openDocument&documentId=[unid] )</dd>
</dl>

Once the control is added, drag a panel into the editable area which will contain the fields you want to display.

The example XML below shows an example of a simple text field. It is important that the ID of the control matches the name of the field to be stored on the document.

<script src="https://gist.github.com/whitemx/7527852.js"></script>

If you want the field to be mandatory, add a styleClass property of "required".
If you want the field to include an 'x' so the contents can be deleted, add a styleClass property of "deletable".

If you want to store a multi value field (for example using a List Box control), the name of the field will need to be prefixed "multi__" (that is two underscores acting as a delimiter) so an example field might look like:

<script src="https://gist.github.com/whitemx/7527868.js"></script>

You can use the Generic Classes to layout the content of your pages.

#Autocomplete Fields
To enable auto complete on a field, there are 3 steps required. Firstly, add the CSS class "autocomplete" to the styleClass property of the field.

Secondly, add an attribute to the field called "auto-src" with a value which is a URL which will return a list of suggestions separated by line breaks.

Normally you would return this list from another XPage using the "headless XPages technique" (sometimes known and XAgents). So as an example the following XML uses an XPage called EmployeeEditDeptAuto.xsp

<script src="https://gist.github.com/whitemx/7527896.js"></script>

The XPage simply returns a list of options:

<script src="https://gist.github.com/whitemx/7527927.js"></script>

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.