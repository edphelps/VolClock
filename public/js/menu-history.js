let shifts = null
let currentYear = null
let yearString = 2018

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
      shifts = response.data.shifts

      yearsWorked(response)
      yearShiftHistory(response)

      if(shifts.length === 0) { res.status(201).json({ message: 'success' }) }
      // call table construction
      onChangeYear()

    })
    .catch((error) => {
      console.log(error)
    })
  }

function getDateOnly(_dt) {
  const dt = new Date(_dt); // this allows the dt param to be Date or String
  if (isNaN(dt))
    return '?'
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`
}

function getTimeOnly(_dt) {
  const dt = new Date(_dt); // this allows the dt param to be Date or String
  if (isNaN(dt)) {
    return "?";
  }
  let hrs = dt.getHours() + 1;
  const am = (hrs < 12);
  if (12 < hrs) hrs -= 12;
  const mins = dt.getMinutes();

  return `${hrs}:${(mins < 10 ? '0' : '')}${mins}${(am) ? 'a' : 'p'}`;
  // return `${dt.getHours() + 1}:${dt.getMinutes()}`;
}

// calculate users total shift hours for current year
function totalShiftHours(thisYearShifts) {
  let hourCount = 0
  thisYearShifts.forEach((shift) => {
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

// calculates the total miles driven for current year shifts
function totalMilesDriven(thisYearShifts) {
  let mileCount = 0
  thisYearShifts.forEach((shift) => {
    let totalMilesHtml = document.getElementById('total-miles-driven')
    mileCount += shift.miles
    totalMilesHtml.innerText = mileCount
  })
}

// loop through all shifts and create year dropdown for years with shift history
function yearsWorked(response) {
  let yearsListHtml = document.getElementById('years-worked-list')
  let dateSet = new Set()
  shifts.forEach((shift) => {
    let shiftEnd = new Date(shift.end_time)
    let endYear = shiftEnd.getFullYear()
    if (endYear < 1970) {
    } else {
      dateSet.add(endYear)
    }
  })
  let dateArray = Array.from(dateSet)
  dateArray.sort().reverse()
  dateArray.forEach((value) => {
    yearsListHtml.innerHTML += `<option>${value}</option>`
  })
}

// loop through each shift and only select years that match current year
function yearShiftHistory(response) {
  shifts.forEach((shift) => {
    let yearsWorkedListHtml = document.getElementById('years-worked-list')
    let shiftEnd = new Date(shift.start_time)
    yearsWorkedListHtml.onchange = function(ev) {
      onChangeYear(ev)
    }
  })
}

// create new table with selected years shifts upone changing year (dropdown)
function onChangeYear(ev) {
  let shiftHistoryList = document.getElementById('list-history')
  while(shiftHistoryList.firstChild) {
    shiftHistoryList.removeChild(shiftHistoryList.firstChild)
  }
  yearString = document.getElementById('years-worked-list').value
  renderTable(yearString)
}

// render table for shifts within selected calendar year
function renderTable(yearString) {
  let year = parseInt(yearString)
  shifts.forEach((shift) => {
    let shiftEnd = new Date(shift.start_time)
    let endYear = shiftEnd.getFullYear()
    currentYear = endYear
  })

  // filter out shifts for current year
  let thisYearShifts = shifts.filter(shift => {
    let shiftEnd = new Date(shift.start_time)
    let endYear = shiftEnd.getFullYear()
    return endYear === year
  })

  // sort shifts by most recent shift id
  thisYearShifts.sort((a,b) => {
    return a.id - b.id
  }).reverse()

  totalShiftHours(thisYearShifts)
  totalMilesDriven(thisYearShifts)
  let shiftHistoryList = document.getElementById('list-history')
  let table = document.createElement('table')
  let tableHead = document.createElement('thead')
  let tableBody = document.createElement('tbody')

  table.setAttribute("class", "table table-bordered table-hover")
    tableHead.innerHTML += `
      <tr>
        <th scope="col">Role Id</th>
        <th scope="col">Shift Date</th>
        <th scope="col">Start Time</th>
        <th scope="col">End Time</th>
        <th scope="col">Hours Worked</th>
        <th scope="col">Miles</th>
      </tr>`

  thisYearShifts.forEach((shift) => {
    let shiftRow = document.createElement('tr')
    let shiftStartInfo = new Date(shift.start_time)
    let shiftEndInfo = new Date(shift.end_time)
    let shiftYear = shiftStartInfo.toDateString()
    let shiftStartShort = getTimeOnly(shift.start_time)
    let shiftEndShort = getTimeOnly(shift.end_time)
    let shiftEndQualifier = new Date(shift.end_time).toLocaleString()
    let shiftHoursWorked = 0
    if (shiftEndInfo > shiftStartInfo) {
      shiftHoursWorked = ((shiftEndInfo - shiftStartInfo)/1000/60/60).toFixed(1)
    } else {
    }
    // let shiftHoursWorked = ((shiftEndInfo - shiftStartInfo)/1000/60/60)
    if (shiftEndQualifier === '12/31/1969, 5:00:00 PM') { shiftEndShort = 'Clocked In'}
    shiftRow.innerHTML += `<td>${shift.role}</td>
      <td>` + shiftYear + `</td>
      <td>` + shiftStartShort + `</td>
      <td>` + shiftEndShort + `</td>
      <td>` + shiftHoursWorked + `</td>
      <td>${shift.miles}</td>`

      tableBody.appendChild(shiftRow)
  })

    table.appendChild(tableHead)
    table.appendChild(tableBody)
    shiftHistoryList.appendChild(table)
}
