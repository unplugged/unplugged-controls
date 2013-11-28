---
layout: 290-post
title:  "UnpFormEditor"
date:   2013-12-01 17:00
categories: "290"
---

This control is a wrapper to handle the validation and saving of your document which is in edit mode.

*Insert images here*

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

```xml
<unp:unpFormEditor showbuttons="yes"
  viewxpagename="FormsReadMode.xsp" formname="Person" title="Person"
  xp:key="facet_1">
  <xp:this.facets>
    <xp:panel xp:key="facet_1">
      <ul class="fieldlist">
        <li>
          <xp:label value="First Name" id="firstnamelabel"
            for="firstname">
          </xp:label>
          <xp:inputText id="firstname" value="#{document1.FirstName}"
            styleClass="required xspInputFieldEditBox deletable">
          </xp:inputText>
        </li>
      </ul>
    </xp:panel>
  </xp:this.facets>
</unp:unpFormEditor>
```

If you want the field to be mandatory, add a styleClass property of "required".
If you want the field to include an 'x' so the contents can be deleted, add a styleClass property of "deletable".

If you want to store a multi value field (for example using a List Box control), the name of the field will need to be prefixed "multi__" (that is two underscores acting as a delimiter) so an example field might look like:

```xml
<xp:listBox id="multi__categories" multiple="true"
  value="#{document1.Categories}" styleClass="xspListBox">
  <xp:selectItem itemLabel=" " itemValue=""></xp:selectItem>
  <xp:selectItems>
    <xp:this.value><![CDATA[#{javascript:var doc:NotesDocument = database.getView("MissionLookup").getFirstDocument();
var out = doc.getItemValue("Categories");
return out;}]]></xp:this.value>
  </xp:selectItems>
</xp:listBox>
```

You can use the Generic Classes to layout the content of your pages.

#Autocomplete Fields
To enable auto complete on a field, there are 3 steps required. Firstly, add the CSS class "autocomplete" to the styleClass property of the field.

Secondly, add an attribute to the field called "auto-src" with a value which is a URL which will return a list of suggestions separated by line breaks.

Normally you would return this list from another XPage using the "headless XPages technique" (sometimes known and XAgents). So as an example the following XML uses an XPage called EmployeeEditDeptAuto.xsp

```xml
<xp:inputText id="dept" value="#{document1.Dept}"
  styleClass="required xspInputFieldEditBox deletable autocomplete">
  <xp:this.attrs>
    <xp:attr name="auto-src" value="EmployeeEditDeptAuto.xsp">
    </xp:attr>
  </xp:this.attrs>
</xp:inputText>
```

The XPage simply returns a list of options:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xp:view xmlns:xp="http://www.ibm.com/xsp/core" rendered="false">
  <xp:this.afterRenderResponse><![CDATA[#{javascript:var exCon = facesContext.getExternalContext(); 
var writer = facesContext.getResponseWriter();
var response = exCon.getResponse();
response.setContentType("text/plain");
response.setHeader("Cache-Control", "no-cache");

var list = $A(@Unique(@DbLookup(@DbName(), "Employees by dept", context.getUrlParameter("q"), 1, "[PARTIALMATCH]"))).sort();
var out = "";
for (var i=0; i<list.length; i++){
  out += list[i] + "\n";  
}
writer.write(out);
writer.endDocument();
facesContext.responseComplete();}]]></xp:this.afterRenderResponse>
  <xp:this.resources>
    <xp:script src="/unpCommon.jss" clientSide="false"></xp:script>
  </xp:this.resources>
</xp:view>
```

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.