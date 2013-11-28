---
layout: 290-post
title:  "UnpNavigatorComputed"
date:   2013-12-01 17:00
categories: "290"
---

This control provides the menu system for your application and works best when used with the related controls [[UnpHeader]] [[UnpFooter]] and [[UnpFlatView]]. It allows you to build a menu dynamically from configuration data or at development time by building a JSON object.

**Insert Images here**

The panel will show automatically if you are viewing the page with an iPad in landscape mode. For smaller devices, you will need to provide a button to show the panel. This is handled for you by the [[unpHeader]] control if you enable the views button.

The menu system can included collapsable sections that show sub menus to two levels.

# Usage
Drag the control onto your page and then complete the menu items custom properties.

You can add as many menu items as required for you application, each menu item has seven properties:

<dl class="dl-horizontal">
  <dt>computedmenuitems</dt><dd>a JSON object which describes the menu, this is described in detail below</dd>
</dl>

In the example below, taken from the Sampler application, there are several menu items. The first loads the Dashboard page using a full page load. The arguments passed in for it indicate that it does not have any submenus, it wants to open the page called UnpMain.xsp and it should show the Font Awesome icon "dashboard". The icon is options, you can also mark the item as disabled.

The second batch of items for "Typography" has a top level menu item which expands two items underneath it when clicked - Read Mode and Edit Mode. Both of these items open an XPage using Ajax, we have specified the IDs of the element to load via Ajax and where to insert it into the current page. We also specify that the items are not disabled and they do not have sub menus of their own.

The third batch of items is similar, most of the sub menu items open pages using Ajax, the exception is the Debug Toolbar which will load with a full page load because we have not specified the ajaxloadid and ajaxtargetid properties.

The final menu item "Font Awesome" is a top level menu item which loads a page via Ajax and again has an icon associated with it. The full list of icons you can use can be found on the [Font Awesome website](http://fontawesome.io/icons).

The most performant approach is to use the Ajax approach to loading pages but there are situations where a full page load is required such as when interacting with the camera.

```xml
<unp:unpNavigatorComputed>
  <unp:this.computedmenuitems><![CDATA[#{javascript:[
      {label: "Dashboard", hasSubMenu: false, page: "/UnpMain.xsp", icon: "fa-dashboard"}, 
      {label: "Typography", hasSubMenu: true, icon: "fa-underline", subMenu: [
        {label: "Read Mode", ajaxloadid: "contentwrapper", ajaxtargetid: "content", page: "/TypographyReadMode.xsp", disabled: false, hasSubMenu: false}, 
        {label: "Edit Mode", ajaxloadid: "contentwrapper", ajaxtargetid: "content", page: "/TypographyEditMode.xsp", disabled: false, hasSubMenu: false}
      ]}, 
      {label: "UI Elements", hasSubMenu: true, icon: "fa-hand-o-up", subMenu: [
        {label: "Accordion", ajaxloadid: "contentwrapper", ajaxtargetid: "content", page: "/Accordion.xsp", disabled: false, hasSubMenu: false}, 
        {label: "CSS Controls", ajaxloadid: "contentwrapper", ajaxtargetid: "content", page: "/CSSControls.xsp", disabled: false, hasSubMenu: false},
        {label: "Debug Toolbar", page: "/DebugToolbar.xsp", hasSubMenu: false}
      ]}, 
      {label: "Font Awesome", ajaxloadid: "contentwrapper", ajaxtargetid: "content", hasSubMenu: false, page: "/FontAwesome.xsp", disabled: false, icon: "fa-leaf"}
    ]}]]></unp:this.computedmenuitems>
</unp:unpNavigatorComputed>

```

# Required Resources
