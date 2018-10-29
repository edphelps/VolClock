
let timeOffButton = null;
let timeOffForm = null;
let notifySupervisorButton = null;
let notifyForm = null;
let buttonOptions = null;

/* ==================================================
*  onMenuNotify()
*
*  Menu selection
* =================================================== */

function onMenuNotify() {
  changeMenuAndContentArea("nav--notify", gelemContentNotify);
}


//When Notify button clicked, notify form appears
function notifySupervisorClick() {
  notifySupervisorButton.addEventListener('click', (ev) => {
    buttonOptions.style.display="none"
    notifyForm.style.display="block"
  })
}
//Notify Form functionality
function notifySupervisorPost(){
  notifyForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    //POST request goes Here
    notifyForm.style.display="none"
    buttonOptions.style.display=""
  })
}
//time off button click, time off form appears
function timeOffClick() {
  timeOffButton.addEventListener('click', (ev) => {
    buttonOptions.style.display="none"
    timeOffForm.style.display="inline"
  })
}
//time off form functionality
function timeOffPost() {
  timeOffForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    //POST request goes here!
    timeOffForm.style.display="none"
    buttonOptions.style.display=""
  })
}

/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded for menu-notify.js");

  timeOffButton = document.getElementById('time-off-button');
  timeOffForm = document.getElementById('inputTimeOffForm');
  notifySupervisorButton = document.getElementById('notify-button');
  notifyForm = document.getElementById('contactSupervisorForm');
  buttonOptions = document.getElementById('contactButtons');

  //functions
  notifySupervisorClick();
  notifySupervisorPost();
  timeOffClick();
  timeOffPost();
});
