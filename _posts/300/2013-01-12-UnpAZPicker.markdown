---
layout: 300-post
title:  "UnpAZPicker"
date:   2013-12-01 17:00
categories: "300"
---

This control displays single letters down the right side of a View for quick searching, it integrates as an add on when using the UnpFlatView control.

![A-Z Picker iPad](http://teamstudio.s3.amazonaws.com/images/azpicker-ipad.png)
![A-Z Picker iPhone](http://teamstudio.s3.amazonaws.com/images/azpicker-iphone.png)

# Usage
The search facility will display results from a view (given in the Custom Property 'viewName') matching the letter selected with the first letter of the contents in the first column (sorted Ascending). For the best results we recommend that you output a categorized view to the FlatView control, and have the category be the first letter, as per the screenshots above.

The results will be displayed in the same XPage as this picker will work on the contents rendered in the HTML DOM (within the UnpFlatView). Because of this; it is not recommended to use the UnpAZPicker when displaying 500+ line items. The current devices and webkit internal browsers do not perform well enough to traverse and re-render this much data populated in the HTML DOM at one time (obviously we expect this to improve over time with updates to devices). In the case where 500+ line items are required use either the dbSearch in UnpHeader and UnpSearchResults or use the UnpAccordion with a categorized view.

Drag the control onto your XPage, outside the UnpScrollableArea control but within the div id=content element. 

In the UnpFlatView control set the Custom Property enableAZPicker to "yes"

<script src="https://gist.github.com/whitemx/7527770.js"></script>

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.