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

  axios.get(`/shifts/user/${gactiveUserId}`)
    .then((response) => {

      totalShiftHours(response)
      totalMilesDriven(response)
      yearsWorked(response)

      if(response.data.shifts.length === 0) { res.status(201).json({ message: 'success' }) }
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

// calculates the total shift hours for user
function totalShiftHours(response) {
  let hourCount = 0
  response.data.shifts.forEach((shift) => {
    let totalHoursHtml = document.getElementById('total-hours-worked')
    let startTime = new Date(shift.start_time)
    let endTime = new Date(shift.end_time)
    if (endTime > startTime) {
      let shiftHoursWorked = endTime - startTime
      hourCount += shiftHoursWorked
    } else {
    }
  totalHoursHtml.innerText = (hourCount/1000/60/60).toFixed(0)
  })
}

// calculates the total miles driven for all shifts
function totalMilesDriven(response) {
  let mileCount = 0
  response.data.shifts.forEach((shift) => {
    let totalMilesHtml = document.getElementById('total-miles-driven')
    mileCount += shift.miles
    totalMilesHtml.innerText = mileCount
  })
}

function yearsWorked(response) {
  let yearsListHtml = document.getElementById('years-worked-list')
  let dateSet = new Set()
  response.data.shifts.forEach((shift) => {
    let shiftEnd = new Date(shift.end_time)
    let endYear = shiftEnd.getFullYear()
    dateSet.add(endYear)
  })
  dateSet.forEach((value) => {
    yearsListHtml.innerHTML += `<button class="dropdown-item" type="button">${value}</button>`

  })
}

function yearShiftHistory(reponse) {
  // Loop through all table rows, and hide those who don't match the search query
  // response.data.shifts.forEach((shift) => {
  //   td = document.getElementById('years-worked-list')
  //   if (td) {
  //     if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
  //       tr[i].style.display = "";
  //     } else {
  //       tr[i].style.display = "none";
  //     }
  //   }
  // }
}
