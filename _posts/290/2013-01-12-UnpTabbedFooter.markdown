---
layout: 290-post
title:  "UnpTabbedFooter"
date:   2013-12-01 17:00
categories: "290"
---

# Function
A tabbed footer bar which can display icons for user navigation. Bottom left is a Sync button which will replicate the current application or all applications depending on the 'synctype' setting. 
The remaining space on the footer displays custom text and/or icons that will navigate to different screens.

![Footer (Phone)](http://teamstudio.s3.amazonaws.com/tabbedfooter.png)

# Usage
Drag the custom control onto your XPage and set the synctype property to point to either 'none', 'currentDB' or 'alldbs' to allow syncing the current db only (default) or all dbs on device. If set to 'none' then the sync button will not appear. 
Create 'tabs' to include tappable areas in the footer for navigation purposes. Within each 'tab' you can set the icon, text, icon when tapped and the page to navigate to. Navigation via the tabbed footer is always performed in an AJAX method.

<pre class="CICodeFormatter" ><code class="CICodeFormatter"> &lt;unp:unpTabbedFooter&gt;  
      &lt;unp:this.tab&gt;  
           &lt;unp:tab icon="icons/house.png" label="Home"  
                page="/UnpMain.xsp" iconselected="icons/house_selected.png"&gt;  
           &lt;/unp:tab&gt;  
           &lt;unp:tab icon="icons/id_card.png" label="All Employees"  
                page="/UnpDemoTabbedFooter.xsp"  
                iconselected="icons/id_card_selected.png"&gt;  
           &lt;/unp:tab&gt;  
           &lt;unp:tab icon="icons/id_card.png" label="Finance Employees"  
                page="/UnpDemoTabbedFooterFinance.xsp"  
                iconselected="icons/id_card_selected.png"&gt;  
           &lt;/unp:tab&gt;  
      &lt;/unp:this.tab&gt;  
 &lt;/unp:unpTabbedFooter&gt;  
</code></pre>

# Required Resources
When you use the Footer custom control make sure that you have the following resources in your application:
* unplugged.js
* unplugged.css
* syncIcon.png