---
layout: 290-post
title:  "Mobile Web Development"
date:   2013-12-01 17:00
categories: "290"
---

The controls in this project are primarily designed to work with Teamstudio Unplugged, however they should also work for mobile web browsers as well (Safari on iOS and Chrome on Android). 

Certain functions are disabled for web browsers where they would not make sense such as the Sync button. If you need to make this distinction in your applications there are methods on both client side and server side to identify where the application is running.

On the client side there is a global boolean variable "unpluggedserver" which defines whether we are running on Unplugged or Domino.

On the server side there is a function in the UnpCommon script library "isUnpluggedServer()" which can be called to work out whether you are running on Unplugged or Domino.