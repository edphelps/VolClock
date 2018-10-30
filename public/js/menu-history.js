// document.addEventListener('DOMContentLoaded', () => {
//   onMenuHistory()
// })

/* ==================================================
*  onMenuHistory()
*
*  Menu selection
*  http GET localhost://shifts/user/${gactiveUserId}
* =================================================== */
function onMenuHistory() {
  changeMenuAndContentArea("nav--history", gelemContentHistory)

  axios.get(`/shifts/user/4`)
    .then((response) => {
      totalShiftHours(response)
      if(response.data.shifts.length === 0) { res.status(201).json({ message: 'success' })
      }
      let shiftHistoryList = document.getElementById('list-history')
      let table = document.createElement('table')
      let tableHead = document.createElement('thead')
      let tableBody = document.createElement('tbody')

      table.setAttribute("class", "table table-bordered table-hover")
      tableHead.setAttribute('class', 'bg-info')
        tableHead.innerHTML += `
          <tr>
            <th scope="col">Role Id</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Miles</th>
          </tr>`

      response.data.shifts.forEach((shift) => {
        console.log('shift>>>>', shift)
        let shiftRow = document.createElement('tr')

        shiftRow.innerHTML += `<td>${shift.role_id}</td>
          <td>` + getDateOnly(`${shift.start_time}`) + `</td>
          <td>` + getDateOnly(`${shift.end_time}`) + `</td>
          <td>${shift.miles}</td>`

      tableBody.appendChild(shiftRow)
      })
      table.appendChild(tableHead)
      table.appendChild(tableBody)
      shiftHistoryList.appendChild(table)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function getDateOnly(_dt) {
    const dt = new Date(_dt); // this allows the dt param to be Date or String
    if (isNaN(dt))
      return "?";
    return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
    // return dt.getMonth()+1 + "/" + dt.getDate() + "/" + dt.getFullYear();
  }

  function totalShiftHours(response) {
    let hourCount = 0
    response.data.shifts.forEach((shift) => {
      let runningTotal = document.getElementById('total-hours-worked')
      let startTime = new Date(shift.start_time)
      let endTime = new Date(shift.end_time)
      let shiftHoursWorked = endTime - startTime
      hourCount += shiftHoursWorked
      console.log('hourCount>>>', hourCount)

      runningTotal.innerText = (hourCount/1000/60/60).toFixed(1)
    })
  }
