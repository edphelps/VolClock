
let notifyButton = null;
let timeOffButton = null;

let timeOffFormDiv = null;
let notifyFormDiv = null;

let contactButtons = null;

/* ==================================================
*  onMenuNotify()
*
*  Menu selection
* =================================================== */

function onMenuNotify() {
  changeMenuAndContentArea("nav--notify", gelemContentNotify);
}

// When Notify button clicked, notify form appears
function notifyClick() {
  console.log("notifyClick");

  // update what sections of page are visible
  contactButtons.style.display = "none";
  notifyFormDiv.style.display = "block";

  // set focus on the comment controlled
  document.forms.notifyForm.elements.notifyComment.focus();
}

// Notify Form post functionality
function notifyPost() {
  console.log("notify post");

  const comment = document.forms.notifyForm.elements.notifyComment.value.trim();
  console.log("posting: ", message);

  // // if the user entered a comment, add it to the notificuations table
  if (comment) {
    axios.post('notifications/', {
      comment: comment,
      start_date: "",
      end_date: "",
    })
    .then((data) => {
      console.log('AXIOS data: ', data)
      })
    // .catch(error) {
    //   console.log("AXIOS error: ", error);
    // }
  }

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";

  return false; // prevent form from actually submitting
}

// Notify Form cancel functionality
function notifyCancel() {

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";
}

// Notify Time-off cancel functionality
function timeOffCancel() {

  // update what sections of page are visible
  timeOffFormDiv.style.display = "none";
  contactButtons.style.display = "";
}

// time off button click, time off form appears
function timeOffClick() {

  // update what sections of page are visible
  contactButtons.style.display = "none";
  timeOffFormDiv.style.display = "inline";
}

// time off form post functionality
function timeOffPost() {

  // POST request goes here!

  // update what sections of page are visible
  timeOffFormDiv.style.display = "none";
  contactButtons.style.display = "";

  return false; // prevent actual form submission
}

/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded for menu-notify.js");

  // div containing the two buttons that choose which form to display
  contactButtons = document.getElementById('contactButtons');
  document.getElementById('notify-button').onclick = notifyClick;
  // console.log("notify-button: ", document.getElementById('notify-button'));
  document.getElementById('time-off-button').onclick = timeOffClick;

  // notify form
  notifyFormDiv = document.getElementById('notifyFormDiv');
  document.getElementById("notify-cancel-button").onclick = notifyCancel;
  notifyFormDiv.onsubmit = notifyPost;

  // time off form
  timeOffFormDiv = document.getElementById('timeOffFormDiv');
  document.getElementById("time-off-cancel-button").onclick = timeOffCancel;
  timeOffFormDiv.onsubmit = timeOffPost;
});
