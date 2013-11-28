---
layout: 300-post
title:  "UnpNavigator"
date:   2013-12-01 17:00
categories: "300"
---

**UnpNavigator is deprecated as of version 3.0. We recommend using the UnpNavigatorComputed instead which performs better and offers a better user experience**

This control provides the menu system for your application and works best when used with the related controls [[UnpHeader]] [[UnpFooter]] and [[UnpFlatView]]

![Navigator iPad](http://teamstudio.s3.amazonaws.com/images/navigator-ipad.png)
![Navigator iPhone](http://teamstudio.s3.amazonaws.com/images/navigator-iphone.png)


The panel will show automatically if you are viewing the page with an iPad in landscape mode. For smaller devices, you will need to provide a button to show the panel. This is handled for you by the [[unpHeader]] control if you enable the views button.

The control can be passed in a number of menu items with details for the label and the URL to open and also whether to open the URL via Ajax or as a full page load request.
The menu system can included collapsable sections that show sub menus to two levels.

# Usage
Drag the control onto your page and then complete the menu items custom properties.

You can add as many menu items as required for you application, each menu item has seven properties:

<dl class="dl-horizontal">
  <dt>ajaxloadid</dt><dd>the element id on the page being loaded containing the HTML which you want to display to the user. 
**Note:** 'contentwrapper' in this example is the name of the auto-generated div tag created when using the unpScrollArea control. Therefore, if using other view or form control types from the Unplugged Controls Project use 'contentwrapper' otherwise use your own custom div wrapper in your target XPage.</dd>
  <dt>ajaxtargetid</dt><dd>the element id in the current page into which you want to insert the contents from the page being loaded</dd>
  <dt>disabled</dt><dd>Used as a marker and disables execution</dd>
  <dt>icon</dt><dd>adds an image to the left of the line item </dd>
  <dt>label</dt><dd>the text label for the item</dd>
  <dt>page</dt><dd>the URL to open when the menu item is clicked</dd>
  <dt>submenu</dt><dd>(default none) allows the menu-item to be tapped and sub-menus shown. Select 'sub' for the first level category and 'sub-sub' for second level categories. If a menu-item is a top level category that contains submenus then only the properties disabled='no', label='my label' and submenu='sub' (or 'sub-sub') should be used. If a higher level menu-item contains a page property then the sub menu-items will not be displayed and the top level menu-item will navigate to the page defined (see code example below). </dd>
  <dt>callback</dt><dd>enter client side JavaScript to execute after clicking the menu item</dd>
</dl>

In the example below there are two menu items. The first will load a page via Ajax and insert the contents of the div called contentwrapper and insert it into a div on the current page called content. The second menu item will load a completely new page.

The most performant approach is to use the Ajax approach to loading pages.

<script src="https://gist.github.com/whitemx/7527966.js"></script>

This example shows how the code is structured for sub-menus:

<script src="https://gist.github.com/whitemx/7527971.js"></script>

# Required Resources
