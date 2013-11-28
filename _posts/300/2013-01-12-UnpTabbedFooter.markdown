---
layout: 300-post
title:  "UnpTabbedFooter"
date:   2013-12-01 17:00
categories: "300"
---

# Function
A tabbed footer bar which can display icons for user navigation. Bottom left is a Sync button which will replicate the current application or all applications depending on the 'synctype' setting. 
The remaining space on the footer displays custom text and/or icons that will navigate to different screens.

![Tabbed Footer iPad](http://teamstudio.s3.amazonaws.com/images/tabbedfooter-ipad.png)
![Tabbed Footer iPhone](http://teamstudio.s3.amazonaws.com/images/tabbedfooter-iphone.png)

# Usage
Drag the custom control onto your XPage and set the synctype property to point to either 'none', 'currentDB' or 'alldbs' to allow syncing the current db only (default) or all dbs on device. If set to 'none' then the sync button will not appear. 
Create 'tabs' to include tappable areas in the footer for navigation purposes. Within each 'tab' you can set the icon, text, icon when tapped and the page to navigate to. Navigation via the tabbed footer is always performed in an AJAX method.

<script src="https://gist.github.com/whitemx/7528015.js"></script>

# Required Resources
When you use the Footer custom control make sure that you have the following resources in your application:
* unplugged.js
* unplugged.css
* syncIcon.png