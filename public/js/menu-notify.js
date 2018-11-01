
// let notifyButton = null;
// let timeOffButton = null;

let timeOffFormDiv = null;
let notifyFormDiv = null;
let reviewDiv = null;

let contactButtons = null;

// track the last user so we can reset when a new user logs in
let lastUser = 0;

/* ==================================================
*  onMenuNotify()
*  Initial Menu selection handler, this is where it all begins
*  when user clicks the top menu.
* =================================================== */
function onMenuNotify() {
  changeMenuAndContentArea("nav--notify", gelemContentNotify);

  // if a new user has logged in we want to reset what sections are visible
  // and any lingering content the last user may have typed into a message or
  // time-off request
  if (lastUser != gactiveUserId) {

    // clear lingering content and reset to show the main three buttons
    notifyCancel();
    timeOffCancel();

    lastUser = gactiveUserId;
  }
}

/* ==================================================
*  notifyClick()
*  Clicked button to initiate the Notify form
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
*  deleteNotication()
*  Clicked delete button for a notification in review list of notifications.
* =================================================== */
function deleteNotification(id) {
  console.log("*** delelete preparing to delete: ", id);
  axios.delete(`notifications/${id}`)
    .then((res) => {
      console.log("");console.log("*** delete res: ", res);console.log("");
      if (!res.data.notification) {
        const err = new Error(`Notification ${id} already deleted`);
        err.status = 500;
        throw err;
      }
      // re-render the review page
      reviewClick();
    })
    .catch((err) => {
      handleError("deleteNotication", err);
    });
}

/* ==================================================
*  reviewClick()
*  Clicked button to initiate the Review page
* =================================================== */
function reviewClick() {
  // console.log("reviewClick");

  // update what sections of page are visible
  contactButtons.style.display = "none";
  reviewDiv.style.display = "block";

  /* ------------------
  *  getDateOnly()
  --------------------- */
  function getDateOnly(_dt) {
    const dt = new Date(_dt); // this allows the dt param to be Date or String
    if (isNaN(dt)) {
      return "?";
    }
    return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
  }
  // ------------------

  axios.get(`notifications/user/${gactiveUserId}`)
    .then((res) => {
      const elemList = document.getElementById('list-review');
      elemList.innerHTML = "loading...";
      let html = "";

      // get the list of notifcations and sort with more recently added first
      const aNotifications = res.data.notifications;
      aNotifications.sort((a, b) => ((a.created_at < b.created_at) ? 1 : -1));

      html = `
        <table class="table">
          <thead>
            <tr>
              <th scope="col">type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th scope="col">message</th>
              <th scope="col">added</th>
            </tr>
          </thead>`;
      for (const oNotification of aNotifications) {
        html += `
            <tr>
              <td><a href="#" onclick=deleteNotification(${oNotification.id})><i class="fas fa-trash-alt"></i></a>&nbsp;`
                   + ((oNotification.start_date) ? 'off' : 'note') + `</td>`;
        if (oNotification.start_date) {
          html += `
              <td>` + getDateOnly(`${oNotification.start_date}`) + ` - ` + getDateOnly(`${oNotification.end_date}`) + `<br>
                   ${oNotification.comment}</td>`;
        } else {
          html += `
              <td>${oNotification.comment}</td>`;
        }
        html += `
              <td>` + getDateOnly(`${oNotification.created_at}`) + `</td>
            <tr>`;
      }
      html += `
          </table>`;

      if (!aNotifications.length) {
        html += "<h5 class='pl-2'>There are no notifications to list</h5>";
      }
      // console.log("---- html: ", html);
      elemList.innerHTML = html;
    })
    .catch((error) => {
      handleError("renderRecentRequests", error);
    });
}

/* ==================================================
*  notifyPost()
*  Clicked Notify Form submit
* =================================================== */
function notifyPost() {
  // console.log("notify post");

  let comment = document.forms.notifyForm.elements.notifyComment.value;
  comment = comment.trim();

  // // if the user entered a comment, add it to the notificuations table
  if (comment.length) {
    const oComment = {
      user_id: gactiveUserId,
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
        handleError("notifyPost", error);
      });
  }

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";

  return false; // prevent form from actually submitting
}

/* ==================================================
*  notifyCancel()
*  Clicked cancel on Notify Form
* =================================================== */
function notifyCancel() {

  // clear form data
  document.forms.notifyForm.elements.notifyComment.value = "";

  // update what sections of page are visible
  notifyFormDiv.style.display = "none";
  contactButtons.style.display = "";
}

/* ==================================================
*  reviewDone()
*  Clicked done on Review pagw
* =================================================== */
function reviewDone() {
  // update what sections of page are visible
  reviewDiv.style.display = "none";
  contactButtons.style.display = "";
}

/* ==================================================
*  timeOffCancel()
*  Clicked cancel in Time-off form
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
*  renderRecentRequests()
*  Render the list of recent time-off requests on right side of screen
* =================================================== */
// function renderRecentRequests() {
//
//   /* ------------------
//   *  getDateOnly()
//   --------------------- */
//   function getDateOnly(_dt) {
//     const dt = new Date(_dt); // this allows the dt param to be Date or String
//     if (isNaN(dt)) {
//       return "?";
//     }
//     return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
//   }
//
//   axios.get(`notifications/user/${gactiveUserId}`)
//     .then((res) => {
//       console.log("***** renderRecentRequests: ", res);
//       const elemList = document.getElementById('list-time-off');
//       elemList.innerHTML = "loading...";
//       let html = "";
//       const aNotifications = res.data.notifications;
//       if (!aNotifications) {
//         html = "no notifications to display";
//       } else {
//         html = `
//           <table class="table">
//             <thead>
//               <tr>
//                 <th scope="col">Start</th>
//                 <th scope="col">End</th>
//                 <th scope="col">Message</th>
//               </tr>
//             </thead>`;
//         for (const oNotification of aNotifications) {
//           html += `
//               <tr>
//                 <td>` + getDateOnly(`${oNotification.start_date}`) + `</td>
//                 <td>` + getDateOnly(`${oNotification.end_date}`) + `</td>
//                 <td>` + `${oNotification.comment}`.slice(0, 10) + `...</td>
//               </tr>`
//           }
//         html += `
//             </table>`
//       }
//       // console.log("---- html: ", html);
//       elemList.innerHTML = html;
//     })
//     .catch((error) => {
//       handleError("renderRecentRequests", error);
//     });
// }

/* ==================================================
*  timeOffClick()
*  Clicked button to initiate the Time-off Form
* =================================================== */
function timeOffClick() {

  // update what sections of page are visible
  contactButtons.style.display = "none";
  timeOffFormDiv.style.display = "inline";

  // render the table to display recent time-off requests
  // renderRecentRequests();

  // set focus on the start date control
  document.getElementById('vacation-start-date-input').focus();
}

/* ==================================================
*  timeOffPost()
*  Clicked submit button on Time-Off Form
* =================================================== */
function timeOffPost() {
  console.log("notify post");

  const start_date = document.getElementById('vacation-start-date-input').value;
  const end_date = document.getElementById('vacation-end-date-input').value;
  let comment = document.getElementById('time-off-text-area').value;
  comment = comment.trim();

  const oRequest = {
    user_id: gactiveUserId,
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
      handleError("timeOffPost", error)
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
  document.getElementById('review-button').onclick = reviewClick;

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

  // review list of notifications and time-off
  reviewDiv = document.getElementById('reviewDiv');
  document.getElementById("review-return-button").onclick = reviewDone;
});
