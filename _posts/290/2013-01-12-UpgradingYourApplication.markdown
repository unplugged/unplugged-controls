---
layout: 290-post
title:  "Upgrading Your Application"
date:   2013-12-01 17:00
categories: "290"
---

When we release a new version of the Unplugged Controls Library, there's a quite likely chance that you will need to modify your application to use them.

At the very least, you will need to copy the new Custom Controls, JavaScript, CSS and File resources. When you do this, depending on the changes we have made, you may need to update your XPages to populate any new Custom Properties which we've added to support new functionality.

If you find that you want to customise our standard controls there are some thing you can do which will make the upgrade process a simpler affair.

The first thing to remember is that you can keep a track of every single line of code in the controls library using Github, the site allows you compare versions of individual files or the entire application so that you can see what has changed over time.

## 1) XPages and Custom Controls
Ideally you should use the standard controls, but if you do need to make changes to them, then take a copy of our standard control and modify that so that you can keep a track of the changes. To see the differences between two custom controls, select them both in Domino Designer, then right click and choose "Compare With > Each other". This way, when a new version of the standard control is released you will be easily able to identify the changes you have made and re-apply them.

If you are merely adding extra content to the standard control then it may be easiest to put those changes in a standalone custom control and add that to the standard control. Again this makes it easier to re-apply your changes to the controls.

Another thing to think about is to investigate the possibilities in creating a branch in the public Github project with your changes. If the changes are generic enough then we can roll them back into the main project so that you don't have to use a custom version of the Library.

## 2) CSS
The thing which you are most likely to want to change is the CSS. Either to make your applications fit your company style guide, or to add support for other UI constructs. As with Custom Controls, we would recommend not modifying the standard CSS files, but, if you changes are relatively simple, create your own custom CSS file and load this as a resource in your XPages after our standard CSS file. This will allow you to over write our standard settings where necessary without having to modify everything else.

Due to the complex weighting system of CSS you may find you will need to add the !important override to elements. If you do this ensure that you have catered for all screen sizes where necessary.

## 3) JavaScript
As with CSS, we would recommend that you do not directly modify the JavaScript files which are provided in the standard controls. But again you can add your own files for custom code. Once again, if you need to modify the standard files then take a copy of the standard files first so that you can keep track of the changes which you make.

If you are reluctant to change the JS as you know you will be updating the controls you can copy the relevant methods in your own JS lib and add an extra parameter to override the function.

## 4) Other Files
We provide a large suite of graphics files in the Controls Library download. These can generally be edited as required with no repercussions. If the files are used in the structure of the application then make sure that you retain the same image width and height.