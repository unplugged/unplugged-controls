---
layout: 300-post
title:  "Generic Classes"
date:   2013-12-01 17:00
categories: "300"
---

When using the unpFormViewer and unpFormEditor controls you can make use of the following CSS classes for buttons, fieldsets and panels;

1. panel - adds a curved corner surround to a div
2. fieldset - a definition is created to layout fieldsets, no class name required
3. left-aligned - will always left align a panel or container regardless of device orientation
4. button - a class which creates a generic button, can be used in conjunction with...
5. savebutton - a save button to be used in conjunction with .button
6. editbutton - an edit button to be used in conjunction with .button
7. cancelbutton - a cancel button to be used in conjunction with .button


{% highlight html %}
<div class="panel">
  This is a panel (or div) with &#160;
  <strong> .panel </strong>
  &#160; class assigned
</div>

<fieldset>
  <legend>This is a fieldset</legend>
  The contents are treated the same as the panel above
</fieldset>

<div class="panel left-aligned">
  This panel will always be left-aligned
</div>


<div style="padding-top:5px;">
  <input type="button" class="button" value="Generic Button (.button)" />
</div>

<div style="padding-top:5px;">
  <input type="button" class="button savebutton"
    value="Save Button (.button .savebutton)" />
</div>

<div style="padding-top:5px;">
  <input type="button" class="button editbutton"
    value="Edit Button (.button .editbutton)" />
</div>

<div style="padding-top:5px;">
  <input type="button" class="button cancelbutton"
    value="Cancel Button (.button .cancelbutton)" />
</div>
{% endhighlight %}