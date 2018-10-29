/*
    Globals
*/

// convenience references to the div content elements, initialized in DOMContentLoaded
let gelemContentClockIn = null;
let gelemContentNotify = null;
let gelemContentHistory = null;
let gactiveUserId = 2;


// object used to cancel current AJAX data loads requests if another is made.
// Ex: user clicks the menu multiple times while a page is loading data.
let goCancelAjax = null;
