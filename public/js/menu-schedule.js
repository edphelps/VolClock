/* ------------------
*  getTimeOnly()
*  in the form:  9:00a  2:00p
--------------------- */
function getTimeOnly(_dt) {
  const dt = new Date(_dt); // this allows the dt param to be Date or String
  if (isNaN(dt)) {
    return "?";
  }
  let hrs = dt.getHours() + 1;
  let am = (hrs <= 12) ? true : false;
  if (12 < hrs) hrs -= 12;
  const mins = dt.getMinutes();

  return `${hrs}:${(mins < 10 ? '0' : '')}${mins}${(am) ? 'a' : 'p'}`;
  // return `${dt.getHours() + 1}:${dt.getMinutes()}`;
}
// ------------------

/* ==================================================
*  onMenuSchedule()
*  Initial Menu selection handler, this is where it all begins
*  when user clicks the top menu.
* =================================================== */
function onMenuSchedule() {
  changeMenuAndContentArea("nav--schedule", gelemContentSchedule);

  axios.get(`assignments/user/${gactiveUserId}`)
    .then((res) => {
      console.log("res: ", res);
      const aAssignments = res.data.assignments;

      for (let dow = 0; dow <= 6; dow++) {
        const elemDow = document.getElementById(`assignment-${dow}`);
        elemDow.innerHTML = "";

        for (const assignment of aAssignments) {
          if (assignment.dow === dow) {
            elemDow.innerHTML += `
               ${assignment.role_id}<br>
               ${getTimeOnly(assignment.start_time)}<br>
               |<br>
               ${getTimeOnly(assignment.end_time)}`;
          }
        }
      }
    })
    .catch((error) => {
      handleError("renderRecentRequests", error);
    });

}
