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
      if(response.data.shifts.length === 0) {
        res.status(201).json({ message: 'success' })
      }

      let shiftHistoryList = document.getElementById('list-history')
      let table = document.createElement('table')
      let tableHead = document.createElement('thead')
      let tableBody = document.createElement('tbody')

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
          <td>${shift.start_time}</td>
          <td>${shift.end_time}</td>
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
