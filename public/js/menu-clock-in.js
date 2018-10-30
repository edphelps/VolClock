
/* ==================================================
*  onMenuClockIn()
*
*  Menu selection
* =================================================== */
function onMenuClockIn() {
  changeMenuAndContentArea("nav--clock-in", gelemContentClockIn);
  checkStatus()

}

const clockInDiv = document.getElementById('clockInDiv')
const clockOutDiv = document.getElementById('clockOutDiv')
const milesInput = document.getElementById('miles')



//creates buttons with roles and inputs default miles
function getRoles() {
  axios.get(`/users/${gactiveUserId}`)
  .then((data) => {
    let roles = data.data.roles
    let miles = data.data.user.miles_default
    milesInput.value = miles

  //loop over roles array and create buttons with role names
  for(let el of roles) {
      let clockInButton = document.createElement('button')
      clockInButton.innerText = el.role
      clockInDiv.appendChild(clockInButton)
      clockInButton.setAttribute('class', "btn btn-primary btn-lg btn-block")
      clockInButton.setAttribute('type', "button")
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

// check if user is already clocked in
function checkStatus() {
  axios.get(`shifts/user/${gactiveUserId}/current`)

  .then((shift) => {
    if(shift.data.current_shift.end_time === null){
      clockInDiv.style.display = "none"
      clockOutDiv.style.display = "inline-block"
    }
  })
  .catch((eror) => {
    console.log(error)
  })
}
