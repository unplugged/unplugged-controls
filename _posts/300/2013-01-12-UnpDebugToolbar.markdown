---
layout: 300-post
title:  "UnpDebugToolbar"
date:   2013-12-01 17:00
categories: "300"
---

(Created By Mark Leusink of [XPages Debug Toolbar](http://www.openntf.org/internal/home.nsf/project.xsp?action=openDocument&name=XPage%20Debug%20Toolbar) fame)

![Debug Toolbar](http://teamstudio.s3.amazonaws.com/images/debugtoolbar-ipad.png)

To display developer information such as logs and error messages use this control.

# Usage

Drag the control onto your XPage, add the unpDebugToolbar Script Library to resources and complete the following Custom Properties:

<dl class="dl-horizontal">
	<dt>defaultCollapsed</dt><dd>boolean which decides whether the toolbar is expanded or collapsed when the page opens</dd>
</dl>

The toolbar offers several extra tools:

* Set of default actions (workspace, back, startpage, sync and reload)
* Messages sections (see the sample page on how to add messages using dBar.debug("My Message") )
* Environment section containing environment variables
* List of the contents of the four scopes

<script src="https://gist.github.com/whitemx/7527784.js"></script>

# Required Resources
When you use the custom control make sure you have the following resources in your application:

* unpDebugToolbar.jss