# Unplugged Custom Controls Library
This project contains a suite of custom controls which can be used to mobilise your applications to work with TeamStudio Unplugged.

You can see a demonstration of the custom controls at [unp.londc.com](http://unp.londc.com/ "unp.londc.com").

* * *

## Header and Footer Custom Controls

This project contains two custom controls which can be added to your XPages. As ever, the supporting CSS, Images, JS and Files should also be copied to your application if you want to use them.

### Header Control
The header custom control *unpHeader* works for both phone and tablet screen resolutions:

#### Phone Interface
  * Default colour is similar to the IBM OneUI scheme
  * **Home** button (with a small rounded-square icon) is always top right and takes you back to the Unplugged workspace
  * **Search** button (with a small rounded-square icon) is always next-to-top-right and opens a search dialog box
  * **Views** button (with an icon) is always top left and takes you to a grouped list of views
  * The screen Title is always in the middle of the header bar and has an optional number in brackets afterwards
  * Resizes when phone orientation is changed to landscape. There is no Unplugged logo in the phone version

#### Tablet Interface
  * Default colour is same as iPhone version.
  * Depth is identical to the header bar we use in the Unplugged Workspace i.e. a bit deeper than the phone header bar
  * **Home** button (with a larger rounded-rectangle icon) is always top right and takes you back to the Unplugged workspace
  * **Search** function is not a button but a box (rounded semi-circles at each end) and is always next-to-top-right 
  * In landscape mode, Views are not activated by a button in the Header bar but are displayed in the nav panel on the left (like the current Teamroom and Doc Library templates).  In portrait mode there is a "Views" button at the top left of the Header bar.
  * The screen Title is always in the middle of the header bar and has an optional number in brackets afterwards
  * Resizes when tablet orientation is changed to landscape.
  * There is an Unplugged logo at the top left of the tablet header bar, but only in landscape mode.

### Footer Control
The footer custom control *unpFooter* works for both phone and tablet screen resolutions:

#### Phone Interface
  * Default colour is same as header bar.
  * Depth is identical to the header bar.
  * **Sync** button (like the sync button in iOS Mail) is always bottom left, and triggers a sync.
  * **New form** button (same appearance as "New email" button in iOS Mail template) is always botton right, and opens up a blank form in edit mode with same data structure as the forms items contained in the View above the Footer bar.

#### Tablet Interface
  * Default colour is same as header bar.
  * Depth is identical to the header bar 
  * **Sync** button (with a larger, green sync icon, like the one we use at the top left of the Unplugged workspace) is always bottom left, and triggers a sync.
  * **New Form** button (same appearance as "New email" button in iOS Mail template) is always bottom right, and opens up a blank form in edit mode with same data structure as the forms items contained in the View above the Footer bar.

* * *

## View Controls

### Flat View Control
-May not be required-

### Accordion Small Data Set Control
Individual View Categories can be expanded and collapsed with no server interaction

### Accordion Large Data Set Control
Individual View Categories can be expanded and collapsed with a server round trip to get the data

### Views Slide-In
Tap on the button on the top left of the Header Bar and a panel showing all the available Views slides in from the left.

* * *

## Form controls
  * Form viewer - read mode
  * Form viewer - edit mode

* * *

## Search controls
  * Search on Screen control
Search function that searches data within the currently displayed screen.
  * Search Local Database
Search function that searches data on the local Domino server
  * Search Remote Database
Search function that goes off and searches on the full remote Domino database.

* * *

## Dialog box

* * *

## SwipeView photo carousel