
/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded");

  // setup convenience variables
  gelemContentClockIn = document.getElementById("content--clock-in");
  gelemContentNotify = document.getElementById("content--notify");
  gelemContentHistory = document.getElementById("content--history");


  // setup nav bar selection handlers
  document.getElementById("nav--clock-in").onclick = onMenuClockIn;
  document.getElementById("nav--notify").onclick = onMenuNotify;
  document.getElementById("nav--history").onclick = onMenuHistory;

  // start with the home menu choice
  onMenuClockIn();
  
});
