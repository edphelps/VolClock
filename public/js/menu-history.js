

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
      response.data.shifts.forEach((shift) => {
        let shiftHistoryList = document.querySelector('tbody.shiftHistory')
        while(shiftHistory.firstChild) {
          shiftHistory.removeChild(shiftHistory.firstChild)
        }
        const row = document.createElement('tr')
        const body = ``
      })
      console.log('response.data.shifts>>>', response.data.shifts)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

onMenuHistory()
