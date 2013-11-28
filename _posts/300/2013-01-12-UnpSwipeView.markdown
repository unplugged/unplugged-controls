---
layout: 300-post
title:  "UnpSwipeView"
date:   2013-12-01 17:00
categories: "300"
---

A control to display an seamless image carousel. Internally this control uses the SwipeView JS lib from [cubiq.org](http://cubiq.org/swipeview) (Matteo Spinelli).

![Swipe View iPad](http://teamstudio.s3.amazonaws.com/images/swipeview-ipad.png)
![Swipe View iPhone](http://teamstudio.s3.amazonaws.com/images/swipeview-iphone.png)

# Usage
This control is designed to be the only control on the page. The control is based on displaying images from a single Notes Document that are stored as attachments in Rich Text Fields.

Drag the control onto your XPage and complete the following Custom Properties:
* DocUNID: the UNID of the doc to display
* formName: the name of the form containing the RTF's with image attachments 

<script src="https://gist.github.com/whitemx/7528007.js"></script>

The UNID can be passed in via a scoped var, manually or from a URL param (as shown above).
The user can either use left-right swipe gestures or tap the plus and minus icons at the top to loop through images. Currently images are displayed at the size they are stored on the Notes Document.

# Required Resources
When you use the Swipe View custom control make sure you have the following resources in your application:
* unp/swipeview.js
* unpSwipeView.css
