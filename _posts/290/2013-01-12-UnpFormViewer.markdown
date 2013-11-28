---
layout: 290-post
title:  "UnpFormViewer"
date:   2013-12-01 17:00
categories: "290"
---

This is a wrapper which is used to display your documents in read mode.

The control will offer buttons to put the document into edit mode, create a new response or close the document.

*Insert Images here

# Usage

Set up a document data binding and make sure it is called document1.

Drag the control onto your XPage and set the following custom properties:

<dl class="dl-horizontal">
  <dt>closexpagename</dt><dd>the name of the XPage to open when the user clicks the close button</dd>
  <dt>dbName</dt><dd>optional parameter to specify which database the document you want to open is located in. The database path should be delimited with forward slashes (e.g. mydir/mydb.nsf). Leave blank for the same db </dd>
  <dt>editxpagename</dt><dd>the name of the XPage to open when switching into edit mode - Note: If blank the button will not be rendered</dd>
  <dt>editxpagewithajax</dt><dd>yes/no (default yes) option to open the XPage containing [[UnpFormEditor]] control in ajax mode or full page load mode. Note: If using camera functionality in edit mode (to captuure pictures) this will need to be set to full-page as the saveDocument function does not save Rich Text Fields. This also means that you will need to use your own standard buttons in [[UnpFormEditor]] and set showbuttons on that control to "no" </dd>
  <dt>formname</dt><dd>the name of the form that documents being displayed are associated with</dd>
  <dt>newresponsexpagename</dt><dd>the name of the XPage to open when requiring a response doc hierarchy - Note: If no response docs are relevant, leave this blank and the button will not be rendered</dd>
  <dt>position</dt><dd>if a [[UnpNavigator]] is used the position needs to be set to 'menu-aligned' to allow for the navigator column to be displayed on tablets in landscape mode. 'left-aligned' will set the data to the left of the device regardless of the navigator included or not</dd>
  <dt>showbuttons</dt><dd>boolean to decide whether to show the standard buttons</dd>
  <dt>title</dt><dd>the title to display above the data</dd>
  <dt>titleiconfield</dt><dd>adds an icon or image to the left of the title in the title bar</dd>
</dl>

Once these are completed, drag a panel into the editable area and add the fields you want to display inside it.

The XML below shows an example where we're displaying the Name field for the document.

```xml
<unp:unpFormViewer showbuttons="true"
  editxpagewithajax="yes" position="menu-aligned" xp:key="facet_1"
  editxpagename="FormsEditMode.xsp" title="Person" titleiconfield="thumbnail"
  formname="Person">
  <xp:this.facets>
    <xp:panel xp:key="facet_1">
      <ul class="fieldlist">
        <li>
          <xp:label value="First Name" id="firstnamelabel"
            for="firstname">
          </xp:label>
          <xp:text id="firstname" value="#{document2.FirstName}">
          </xp:text>
        </li>
      </ul>
    </xp:panel>
  </xp:this.facets>
</unp:unpFormViewer>
```

You can use [[Generic Classes]] to layout the content of your pages.

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.