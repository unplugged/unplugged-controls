---
layout: 330-post
title:  "UnpCalendar"
date:   2013-12-01 17:00
categories: "330"
---

# Function
The calendar control is a simplified implementation of [Full Calendar](http://arshaw.com/fullcalendar/) by Adam Shaw. We have exposed common settings that you may want to use, but you can easily edit the source unplugged.js to make more complex changes to meet your requirements.

![Calendar iPad](http://teamstudio.s3.amazonaws.com/images/tablet-calendar.png)
![Calendar iPhone](http://teamstudio.s3.amazonaws.com/images/phone-calendar.png)


For an example of the Calendar in action download the samples database and open the XPage called Calendar

# Usage

<dl class="dl-horizontal">
	<dt>defaultviewphone</dt><dd>The default view to open when viewing the calendar with a phone. Default is basicWeek, options are month, basicWeek, basicDay, agendaWeek, agendaDay</dd>
	<dt>defaultviewtablet</dt><dd>The default view to open when viewing the calendar with a tablet. Default is month, options are month, basicWeek, basicDay, agendaWeek, agendaDay</dd>
	<dt>enddatefield</dt><dd>The field on documents that stores the end date for the event (must be a date field)</dd>
	<dt>headerbuttonsleft</dt><dd>The buttons to display top left, comma separated without spaces. Default is prev,today,next. options are: title, prev, next, prevYear, nextYear, today, month, basicWeek, basicDay, agendaWeek, agendaDay</dd>
	<dt>headerbuttonsrightphone</dt><dd>The buttons to display top right when using a phone. Default is none. Options are: title, prev, next, prevYear, nextYear, today, month, basicWeek, basicDay, agendaWeek, agendaDay</dd>
	<dt>headerbuttonsrighttablet</dt><dd>The buttons to display top right when using a tablet. Default is agendaDay,agendaWeek,month. Options are: title, prev, next, prevYear, nextYear, today, month, basicWeek, basicDay, agendaWeek, agendaDay</dd>
	<dt>highlightfield</dt><dd>The name of the field to test a condition against to decide whether to highlight the event</dd>
	<dt>highlighttest</dt><dd>A logical boolean test to run against the contents of the highlightfield to decide whether to highlight the event</dd>
	<dt>startdatefield</dt><dd>The field on the documents that stores the start date for the event (must be a date field)</dd>
	<dt>titlefield</dt><dd>The field on the documents to get the display text for the event from</dd>
	<dt>viewname</dt><dd>The view to get the data from. It must be categorized with the first column in the format yyyymm</dd>
	<dt>viewxpage</dt><dd>The XPage to open when a user taps a calendar entry</dd>
</dl>

<script src="https://gist.github.com/whitemx/906050275af37eab6f8b.js"></script>

# Multi Day Events
There are two ways to display multi day events.

Option 1 is to set the start and end time of the event. So for example 01/03/2014 13:00 and 04/03/2014 13:00 would see the event start at 1pm on 1st March 2014 and finish at 1pm on 4th March.

If you don't want to have the event show up with a start time, then set the times to 00:00 (ie midnight) and make the end date the day after the actual finish. So 01/03/2014 00:00 and 05/03/2014 00:00 would show a multi day event starting on 1st March and finishing on 4th March.

# Required Resources
On the assumption you are using UnpHeader in your application then the only extra resource required is fullcalendar.css.

If you are not using UnpHeader, then make sure you add all of the resources included in UnpHeader to your UnpMain XPage.
