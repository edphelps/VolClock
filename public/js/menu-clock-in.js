
/* ==================================================
*  onMenuClockIn()
*
*  Menu selection
* =================================================== */
function onMenuClockIn() {
  changeMenuAndContentArea("nav--clock-in", gelemContentClockIn);


}
// //ids for shift buttons (will click to clock in)
// const shift1 = document.getElementById('shift1')
const clockInDiv = document.getElementById('clockInDiv')
const clockOutDiv = document.getElementById('clockOutDiv')
const milesInput = document.getElementById('miles')
// clockIn()
checkStatus()

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

function checkStatus() {
  //determine if user is clocked in
  //if clocked in, only show clock out button
  //if NOT clocked in, only show clock in buttons
  axios.get(`shifts/user/${gactiveUserId}/current`)
  //if clocked out then current shift = null
  //if clocked in, current shift =
    .then((shift) => {
      if(shift.current_shift.end_time === null){
        clockInDiv.style.display = "none"
        clockOutDiv.style.display = "inline-block"
      }
    })


}
// function clockIn () {
//   //post request
//   //event listener on buttons div
//   //ev.target will be shift to clock in for
//   //determine if user
// }
