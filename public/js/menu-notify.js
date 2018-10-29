
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

//When Notify button clicked, notify form appears
notifySupervisorButton.addEventListener('click', (ev) => {
  buttonOptions.style.display="none"
  notifyForm.style.display="block"
})

//Notify Form functionality
notifyForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  //POST request goes Here
  notifyForm.style.display="none"
  buttonOptions.style.display=""
})

//time off button click, time off form appears
timeOffButton.addEventListener('click', (ev) => {
  buttonOptions.style.display="none"
  timeOffForm.style.display="inline"
})
