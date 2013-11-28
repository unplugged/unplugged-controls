---
layout: 300-post
title:  "UnpScrollableArea"
date:   2013-12-01 17:00
categories: "300"
---

This custom control has no UI, but is used in conjunction with the other controls for better scrolling functionality of other UI elements.

We use native scrolling for each platform, but due to the potentially complex layout of different applications, this control offers a quick way of making an area scrollable. You can always set the correct overflow settings of `<div>` elements to create your own scrollable areas.

We generally recommend wrapping our View and Form controls in a Scrollable Area.

# Usage
Drag the control onto your XPage and then add your content into the editable area.

In the example below we have a Scrollable Area and inside that there is a panel into which we will insert our content.

<script src="https://gist.github.com/whitemx/7527993.js"></script>

The div which gets generated will be called "contentwrapper", this div ID is used by various functions in the standard CSS so should only be changed with caution!

# Limitation for zoom control
When using the UnpScrollableArea to contain your content (which is advised), the 'standard' method to allow zooming will not work:

# Required Resources