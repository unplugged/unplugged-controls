---
layout: 290-post
title:  "UnpSwipeView"
date:   2013-12-01 17:00
categories: "290"
---

A control to display an seamless image carousel. Internally this control uses the SwipeView JS lib from [cubiq.org](http://cubiq.org/swipeview) (Matteo Spinelli).

![Image gallery](http://teamstudio.s3.amazonaws.com/swipeview.png )
# Usage
This control is designed to be the only control on the page. The control is based on displaying images from a single Notes Document that are stored as attachments in Rich Text Fields.

Drag the control onto your XPage and complete the following Custom Properties:
* DocUNID: the UNID of the doc to display
* formName: the name of the form containing the RTF's with image attachments 

<pre class="CICodeFormatter" ><code class="CICodeFormatter"> &lt;xc:unpSwipeView formName="Employee"&gt;  
      &lt;xc:this.DocUNID&gt;&lt;![CDATA[#{javascript:param.get("documentId");}]]&gt;&lt;/xc:this.DocUNID&gt;  
 &lt;/xc:unpSwipeView&gt;  
</code></pre>

The UNID can be passed in via a scoped var, manually or from a URL param (as shown above).
The user can either use left-right swipe gestures or tap the plus and minus icons at the top to loop through images. Currently images are displayed at the size they are stored on the Notes Document.

# Required Resources
When you use the Swipe View custom control make sure you have the following resources in your application:
* unp/swipeview.js
* unpSwipeView.css
