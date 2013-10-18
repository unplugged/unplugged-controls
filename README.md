# Unplugged Controls
## Introduction
Teamstudio's Unplugged Controls project provides a free highly-optimized set of XPages mobile controls.

Benefits to Domino developers are four-fold:

1. An actively-maintained project supporting the latest mobile devices and OS versions
2. Lightweight, fast HTML5 framework, built on HTML, CSS and Javascript-based components
3. Packaged as custom controls for Domino Designer for maximum developer productivity
4. Much easier to achieve an attractive, up-to-the-minute mobile look and feel 

The overall concept of the controls is to build a lightweight, minimum-memory framework on top of the basic JQuery framework.
Unplugged Controls are suitable for both experienced XPages mobile developers and also for those developers who are new to mobile development.
They also simplify the mobile development process for Notes developers who may be new to XPages.

Using these controls, we also provide three free app templates (Teamroom, Doc Library, Journal) that are compatible with the original Lotus Domino application templates.  

The Unplugged Controls allow you to build web apps and apps that automatically optimise for tablet and smartphone form factors.
Supported devices include Apple mobile devices running on iOS 6.0 and higher, and Android devices running 4.0 and higher.
The Controls will also work on Webkit-based PC browsers including Safari and Chrome.

The latest released version of the Controls is v1.8, which has been enhanced to support new browser features in iOS 7.
**Update: All Doc is now on the Wiki at: https://github.com/unplugged/unplugged-controls/wiki

IMPORTANT: When running the sample application on your server, open the 'HomeLinks' view and ensure it is empty. Then open the 'Databases' view, select all documents and run the agent "Generate Home Workspace".  This will create the documents required to populate the home page with icons.

When combined with Teamstudio's optional Unplugged Engine and Unplugged Server components (commercially-licensed software) you can quickly enhance your Unplugged web apps to the next level of mobile user experience, with the following advantages:

- a full offline capability, important for mobile workers working out of the office
- a faster, more fluid user experience on a par with mass-market consumer apps
- one-click deployment using the Unplugged Server admin interface

To find out more about Teamstudio Unplugged click here: http://www.teamstudio.com/solutions/unplugged/

## Changes

### v1.8.0 (18th October 2013)
####This version is intended for use with Unplugged 3.x only. If you are still running Unplugged 2.x please download version 1.7 of the Controls Library###
- Removed iScroll
- Added history support so that you can use browser back functionality
- Added databaseName support to unpFormViewer


### v1.7.0 (10th September 2013)
- UPMark Benchmarking to create a common performance benchmark for the Controls Library, we are working hard on performance optimisation for an upcoming release
- Make Search Results count configurable
- Remove About dialog from Header, new design pattern is to add a navigator item called About
- Fix various layout issues
- Support opening in full mode from tabbed footer links
- Support execution of JS before footer tab link is opened

### v1.6.0 (19th July 2013)
- Make colours configurable.
This change is split over v1.6 and v1.7 (to be released in September). For the moment a second stylesheet is now available for use in place of the standard one.
- Make UnpNavigatgor support expandable entries. A new custom property "submenu" is available to flag a menu item as top level, sub or sub-sub
- Added Sync button to footer tabs control
- Home button in header bar made larger for tablets
- Improved layout of footer tabs control
- Added support for a disabled workspace item in the workspace control
- Flat view can now support up to 3 lines of text wrapping in the summary column
- Improved Search bar behaviour, search box now expands when selected
- Added support for relative links in the Workspace control
- Added option to allow the Accordion view to automatically open the first category
- Added support for disabled items in the Navigator control
- Re-styled the back button to be more "iOS-like"
- Fixed bug with labels not displaying properly in form editor control
- Added FastClick support to speed up response times generally
- Upgraded jQuery to use v2.0
- Improved layout of Debug Toolbar buttons
- Fixed scrolling / layout issues with Dialog control
- Improved layout of Swipe View Control
- Stopped wrapping of long labels in Form Editor control for small devices (phones)
- Various other minor bug fixes

### v1.5.0 (4th June 2013)
- Fixed bug with display of view categories in unpFlatView control caused by release of Unplugged 2.4
- UnpFormViewer now supports display of an icon or image in the header bar
- Added new isEmpty() function for use in Server Side JavaScript
- Added new navigation buttons to UnpSwipeView control
- Fixed layout bug with UnpFormViewer control in Landscape mode with no navigator
- Added new A-Z view navigator control
- Changed database title of Controls Library database
- Fixed bug with UnpDemoNavigator pages
- Added support to override the default action of the Home button in UnpHeader
- Fixed bug with blank categories in UnpAccordion
- Fixed rounded corners bug with UnpAccordion
- Added new Unplugged Logo
- Added support for Disabled workspace icons in UnpWorkspace
- Added new UnpTabbedFooter control

### v1.4.0 (29th April 2013)
- Reduce use of dependent CSS selectors
- Add "About" dialog box. Accessed by tapping the title in the header bar. Populated by completing appVersion and appDescription custom properties. Leave blank to disable.
- Added support for Type ahead edit box. To enable add "autocomplete" to the styleClass property of the field you want to autocomplete. Then add an attribute "auto-src" which is the name of the URL which will generate the JSON formatted data with suggestions.
- Added category support to Flat View Control. Categories now display as a blue separator bar with the category title inside
- Added icon support to Flat view control. URL pointing to image to use should be calculated in a new view column
- Added expandable row support to Flat View Control. The flat view row entries can be displayed as a single line of text which can be tapped to expand. When using this new feature, the document cannot be opened.
- Fixed bug with Accordion view control where the view scrolled to the top of the page when expanding a category
- Added support for a spinner graphic on page interestitials. Populate a div called "loading" to enable
- Fixed bug with Back button not displaying correctly on smaller devices
- Added support for wrapping content in Flat View Control. By default text is still truncated but a new custom property called "wrapsummarytext" can be set to "yes" to enable
- Keyboard now automatically displays when click search icon on phone

### v1.3.0 (26th Mar 2013)
1. - Date not displayed in Android footer bar
102. - Add CSS Controls - New non location specific CSS classes have been created for buttons and fieldsets. See demo database for examples
103. - Define classes to control left-aligned and menu-aligned. See demo database for examples
107. - Expandable fieldset control. New CSS classes defined to control fieldsets, see demo database for examples
124. - UnpNavigator page selector in custom properties now works correctly
128. - Last updated date/time now shows in footer. If current database has been replicated after all databases then latest time shows
133. - Editable fields can now be cleared with an iOS style (x) button using new deletable css class
134. - Fixed bug with Save and Cancel button display
135. - Editable fields can now be cleared with an iOS style (x) button using new deletable css class
136. - Form field labels now align vertically better
137. - All custom controls moved to a new Namespace*
138. - Fixed bug when using Mobile controls with OneUI v2.1 on a web browser
140. - Textarea text size has been increased
141. - Demo dialog box text size increased
142. - On initial sync, footer bar displays (never) rather than 1/1/1970
143. - Fixed bug with alignment of view and navigator panels
144. - Last synced footer message format changed to be slightly shorter
146. - Changed size of New Response button
148. - Fixed viewport metadata tag to be comma separated

NB: Due to the Namespace changes of all custom controls, all XPages will need to be edited and two sets of changes made.
Firstly, make sure that the new namespace is added to the xp:view tag:  xmlns:unp="http://unplugged.teamstudio.com"
Secondly, every reference to xc:unp tags needs to be updated to unp:unp:

So for example, the old format of:
```xml
<xp:view xmlns:xp="http://www.ibm.com/xsp/core"
  xmlns:xc="http://www.ibm.com/xsp/custom">
	<xc:unpFlatView insetData="true" detailColumn="Date"
		summaryColumn="Topic" title="All Documents"
		viewName="(Unp All Documents)" xpageDoc="Document.xsp" ajaxload="yes"
		xp:key="facet_1" numberofrows="20" refreshmethod="pull">
	</xc:unpFlatView>
</xp:view>
```
will now become:
```xml
<xp:view xmlns:xp="http://www.ibm.com/xsp/core"
	xmlns:xc="http://www.ibm.com/xsp/custom" xmlns:unp="http://unplugged.teamstudio.com">
	<unp:unpFlatView insetData="true" detailColumn="Date"
		summaryColumn="Topic" title="All Documents"
		viewName="(Unp All Documents)" xpageDoc="Document.xsp" ajaxload="yes"
		xp:key="facet_1" numberofrows="20" refreshmethod="pull">
	</unp:unpFlatView>
</xp:view>
```

### v1.2.0 (22nd Feb 2013)
93. - Display data from a different database in Flat View control
98. - Enhance UI for documents in edit mode
99. - Re-styled Back button
100. - Fixed bug with Dialog Control when used on document in edit mode
101, 110. - Fixed layout bug for widescreen Android tablets
105. - Renamed unpViewList control to unpNavigator to be more descriptive
109, 121. - Re-styled Home page of sample app to use Workspace control. (Make sure to run "Generate Home Workspace" agent to see the icons)
111. - Fixed various bugs to allow all controls to work in mobile browsers as well as Unplugged
115. - Documentation updated
117. - Variables created to allow developer to tell where code is running (Unplugged or Domino)
119. - Fixed bug with display of icons on Workspace on iPad
122. - Added menu-aligned option to Accordion control
123. - Added support for null setting of search property in UnpHeader control
126. - Added option for new button in footer to perform a full page load or Ajax load
127. - Added option to Sync button in footer to sync current database or all databases
129. - Fixed bug with showbuttons property in unpFormEditor
130. - Added option for Edit button in Form Viewer control to perform a full page load or Ajax load
131. - Fixed bug with Flat view control get more data function if the data column is left blank

### v1.1.0 (22nd Jan 2013)
85. - UnpViewsList - made documentation better (in Github Wiki) and also changed Custom Property defaults to be more logical
86. - UnpAccordion - made last element in list show with rounded corners where appropriate. Also changed Custom Property picker for xpage to use the XPages List
87. - Search bar - The keyboard now hides after executing a search
89. - UnpFlatView - now has a new custom property which allows to open documents with full page loads or via Ajax (the default)
90. - UnpFlatView - fixed display bug when no detail row was specified
91. - UnpFlatView - fixed display bug when no title property was specified
96. - BlockUI called on various links to give user feedback that something is happening following a click
97. - Changed Flat View Demo page to open a different Employee document that the full widget demo

