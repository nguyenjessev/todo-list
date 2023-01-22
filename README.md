# Todo List

This is a basic todo list application.

## Requirements

Allow for task creation, multiple projects, task deletion, due dates, and 
priorities.

## What I Used

HTML, JavaScript, CSS, webpack, date-fns

## What I Learned

This was a tough one! I had to build out a pretty detailed framework for 
managing projects, tasks, and all of the related metadata.

Most of the challenges were related to user experience and navigation. I had to 
think about how to let the user create multiple projects, attach multiple tasks 
to those projects, and how to manage and save the creation of tasks all with 
different names, descriptions, priorities, and due dates.

Another challenge I faced was formatting the due dates using `date-fns`. I 
learned that when using an `input[type="date"]` the times are based on UTC, and 
not on the user's local time. This presented issues when trying to display the 
date back to the user, as the displayed date was often 1 day offset from the 
user's local time. I found that the `Date` object has a way to get the user's 
local offset, which let me do some simple math to correct the UTC dates.
