---
layout: 300-post
title:  "FontAwesome"
date:   2013-12-01 17:00
categories: "300"
---

Rather than including icon image files, we make use of the [Font Awesome](http://fontawesome.io) (version 4.0.3) icon font. This allows us to offer several hundred icons without increasing the size of the database or affecting performance.

For details on how to use Font Awesome please check out the official website. 

Places where we use the font in the default controls are the header, tabbed footer, and navigator. Where we need you to provide information to a control via a Custom Property, and we ask for an icon file name, you enter the name of the icon class.

So as an example, in the Sampler application navigator, we include icons for each top level menu item:

<script src="https://gist.github.com/whitemx/7659163.js"></script>

In the example above we have four menu items, each has an icon associated with them. The Icon is identified by the class name, so "fa-dashboard" will return a speedometer icon, "fa-underline" will return an underlined U character. We picked these items from the Font Awesome website documentation.

You can easily make use of the Font Awesome Icons in your own custom code, using the markup:

<script src="https://gist.github.com/whitemx/7659230.js"></script>

The [Font Awesome Examples](http://fontawesome.io/examples/) page has many more samples of what you can do.