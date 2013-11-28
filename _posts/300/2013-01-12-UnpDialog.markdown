---
layout: 300-post
title:  "UnpDialog"
date:   2013-12-01 17:00
categories: "300"
---

# Function
The Dialog control allows you to add a Dialog box to a page. It will display "over" the rest of the content of the page and will show 2 buttons: OK and Cancel.

![Accordion iPad](http://teamstudio.s3.amazonaws.com/images/dialog-ipad.png)
![Accordion iPhone](http://teamstudio.s3.amazonaws.com/images/dialog-iphone.png)

If the user clicks cancel the dialog will be hidden.

If the user clicks the OK button the dialog will be hidden and you can run a Client Side JavaScript function as well.

The content of the dialog box is populated by adding the text or fields into the editable area on the XPage that you create. 

If the content of the dialog box is too tall for the page then make sure to use the unpScrollableArea control inside the editable area.

For an example of the Dialog in action download the samples database and open the XPage called UnpDemoDialog

# Usage

<script src="https://gist.github.com/whitemx/7527814.js"></script>

In this example the Dialog will show with the words "Content goes here" in the body. Below that will be the OK and Cancel buttons. When the OK button is pressed a JavaScript function call "myFunction()" will be executed, remember to write that function in client side script and have it available on the main page of your application.

To show the dialog add HTML in the following format:

<script src="https://gist.github.com/whitemx/7527820.js"></script>

The href is the ID of the Dialog box div tag. The class name is the way the link is made to open a Dialog when it is clicked.

# Required Resources
On the assumption you are using UnpHeader in your application then no extra resources are required.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.