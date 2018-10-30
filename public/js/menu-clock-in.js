
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
}
