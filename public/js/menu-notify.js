
/* ==================================================
*  onMenuNotify()
*
*  Menu selection
* =================================================== */

function onMenuNotify() {
  changeMenuAndContentArea("nav--notify", gelemContentNotify);
}

const timeOffButton = document.getElementById('time-off-button')
const timeOffForm = document.getElementById('inputTimeOffForm')
const notifySupervisorButton = document.getElementById('notify-button')
const notifyForm = document.getElementById('contactSupervisorForm')
const buttonOptions = document.getElementById('contactButtons')

//functions
notifySupervisorClick()
notifySupervisorPost()
timeOffClick()
timeOffPost()

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
