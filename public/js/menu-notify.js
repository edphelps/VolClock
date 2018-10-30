
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

/* ==================================================
*  notifyClick()
*  Switch to Notify form
* =================================================== */
function notifyClick() {
  // console.log("notifyClick");

  // update what sections of page are visible
  contactButtons.style.display = "none";
  notifyFormDiv.style.display = "block";

  // set focus on the comment control
  document.forms.notifyForm.elements.notifyComment.focus();
}

/* ==================================================
*  notifyPost()
*  Notify Form submit handler
* =================================================== */
function notifyPost() {
  // console.log("notify post");

  let comment = document.forms.notifyForm.elements.notifyComment.value;
  comment = comment.trim();

  // // if the user entered a comment, add it to the notificuations table
  if (comment.length) {
    const oComment = {
      user_id: 2,
      comment,
    };
    // console.log("Send object to AXIOS: ", oComment);
    axios.post('notifications/', oComment)
      .then((data) => {
        console.log('AXIOS data: ', data);
        if (!data.data.notification) {
          const err = new Error("axios post failed to return the posted record");
          err.status = 500;
          throw err;
        }
        // clear form data, AXIOS call was successful
        document.forms.notifyForm.elements.notifyComment.value = "";
      })
      .catch((error) => {
        console.log("AXIOS error: ", error);
      });
  }

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";

  return false; // prevent form from actually submitting
}

/* ==================================================
*  notifyPost()
*  Notify Form cancel functionality
* =================================================== */
function notifyCancel() {

  // clear form data
  document.forms.notifyForm.elements.notifyComment.value = "";

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";
}

/* ==================================================
*  timeOffCancel()
*  Notify Time-off cancel functionality
* =================================================== */
function timeOffCancel() {

  // clear form data
  document.getElementById('vacation-start-date-input').value = "";
  document.getElementById('vacation-end-date-input').value = "";
  document.getElementById('time-off-text-area').value = "";

  // update what sections of page are visible
  timeOffFormDiv.style.display = "none";
  contactButtons.style.display = "";
}

/* ==================================================
*  timeOffClick()
*  time off button click, time off form appears
* =================================================== */
function timeOffClick() {

  // update what sections of page are visible
  contactButtons.style.display = "none";
  timeOffFormDiv.style.display = "inline";

  // set focus on the start date control
  document.getElementById('vacation-start-date-input').focus();
}

/* ==================================================
*  timeOffPost()
*  time off form post functionality
* =================================================== */
function timeOffPost() {
  console.log("notify post");

  const start_date = document.getElementById('vacation-start-date-input').value;
  const end_date = document.getElementById('vacation-end-date-input').value;
  let comment = document.getElementById('time-off-text-area').value;
  comment = comment.trim();

  const oRequest = {
    user_id: 2,
    start_date,
    end_date,
    comment,
  };
  // console.log("Send object to AXIOS: ", oComment);
  axios.post('notifications/', oRequest)
    .then((data) => {
      console.log('AXIOS data: ', data);
      if (!data.data.notification) {
        const err = new Error("axios post failed to return the posted record");
        err.status = 500;
        throw err;
      }
      // clear form data, AXIOS call was successful
      document.getElementById('vacation-start-date-input').value = "";
      document.getElementById('vacation-end-date-input').value = "";
      document.getElementById('time-off-text-area').value = "";
    })
    .catch((error) => {
      console.log("AXIOS error: ", error);
    });

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
  document.getElementById('time-off-button').onclick = timeOffClick;

  // notify form
  notifyFormDiv = document.getElementById('notifyFormDiv');
  document.getElementById("notify-cancel-button").onclick = notifyCancel;
  document.forms.notifyForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    notifyPost();
  });

  // time off form
  timeOffFormDiv = document.getElementById('timeOffFormDiv');
  document.getElementById("time-off-cancel-button").onclick = timeOffCancel;
  document.forms.timeOffForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    timeOffPost();
  });
});
