
/* ==================================================
*  onMenuAdmin()
*  Initial Menu selection handler, this is where it all begins
*  when user clicks the top menu.
* =================================================== */
function onMenuAdmin() {
  changeMenuAndContentArea("nav--admin", gelemContentAdmin);
  renderAdminReview();
}

/* ==================================================
*  deleteNoticationAdmin()
*  Clicked delete button for a notification in review list of notifications.
* =================================================== */
function deleteNotificationAdmin(id) {
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
      renderAdminReview();
    })
    .catch((err) => {
      handleError("deleteNotication", err);
    });
}

/* ==================================================
*  renderAdminReview()
*  render the page listing all notifications
* =================================================== */
function renderAdminReview() {
  console.log("renderAdminReview");


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

  axios.get(`notifications`)
    .then((res) => {
      console.log("admin review res: ", res);
      const elemList = document.getElementById('list-review-admin');
      elemList.innerHTML = "loading...";
      let html = "";

      // get the list of notifcations and sort with more recently added first
      const aNotifications = res.data.notifications;
      aNotifications.sort((a, b) => ((a.created_at < b.created_at) ? 1 : -1));

      html = `
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">del</th>
              <th scope="col">user</th>
              <th scope="col">message or time-off</th>
              <th scope="col" class="text-center">added</th>
            </tr>
          </thead>`;
      for (const oNotification of aNotifications) {
        html += `
            <tr>
              <td><a href="#" onclick=deleteNotificationAdmin(${oNotification.id})><i class="fas fa-trash-alt"></i></a>
              <td>${oNotification.fname} ${oNotification.lname}</a>`;
        if (oNotification.start_date) {
          html += `
              <td>` + getDateOnly(`${oNotification.start_date}`) + ` - ` + getDateOnly(`${oNotification.end_date}`) + `<br>
                   ${oNotification.comment}</td>`;
        } else {
          html += `
              <td>${oNotification.comment}</td>`;
        }
        html += `
              <td class="text-center">` + getDateOnly(`${oNotification.created_at}`) + `</td>
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
      handleError("renderAdminReview", error);
    });
}
