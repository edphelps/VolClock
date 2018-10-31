
/* ==================================================
*  onMenuClockIn()
*
*  Menu selection
* =================================================== */
function onMenuClockIn() {
  changeMenuAndContentArea("nav--clock-in", gelemContentClockIn);
  checkStatus()
  // dropdownRoles()
}
const dropDown = document.getElementById('dropdownRoles')
const clockInDiv = document.getElementById('clockInDiv')
const clockOutDiv = document.getElementById('clockOutDiv')
const milesInput = document.getElementById('miles')
const clockInSuccess = document.getElementById('clockInSuccess')
const milesForm = document.getElementById('milesForm')
//creates drop down list of all roles
function dropdownRoles(){
  axios.get('/roles')
  .then(roles => {
    let roleArray = roles.data.roles

    roleArray.sort(function(a, b) {
      return a.role - b.role  ||  a.role.localeCompare(b.role)
    })

    let other = roleArray.find(el => el.role === 'Other')
    let otherIndex = roleArray.indexOf(other)
    let spliced = roleArray.splice(otherIndex, 1)

    roleArray.push(spliced[0])

    for (let el of roleArray){
      let listItem = document.createElement('button')
      listItem.setAttribute('class', 'dropdown-item')
      listItem.innerText = el.role
      listItem.setAttribute('id', el.id)
      dropDown.appendChild(listItem)
      //sortedRoles.sort()
    }
  })
}

//function for sending post request from drop down menu list item
function sendDropDownRole() {
  dropDown.addEventListener('click', (ev) => {

  })
}

//creates buttons with roles and inputs default miles
function getRoles() {
  axios.get(`/users/${gactiveUserId}`)
  .then((data) => {
    let roles = data.data.roles
    let miles = data.data.user.miles_default
    milesInput.value = miles
  //loop over roles array and create buttons with role names
  for(let el of roles) {
    // console.log(el.id)
      let clockInButton = document.createElement('button')
      clockInButton.innerText = el.role
      clockInDiv.appendChild(clockInButton)
      clockInButton.setAttribute('class', "btn btn-primary btn-lg btn-block")
      clockInButton.setAttribute('type', "button")
      clockInButton.setAttribute('id', el.id)
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
      clockInSuccess.style.display = ""
      milesForm.style.display = "none"
    }
    if (shift.data.current_shift.end_time !== null){
      clockInDiv.style.display = ""
      clockOutDiv.style.display = "none"
      clockInSuccess.style.display = "none"
      milesForm.style.display = ""
    }
    if(shift.data.previous_shift_today === true){
      milesForm.style.display = "none"
    }
  })
  .catch((eror) => {
    console.log(error)
  })
}
document.addEventListener('DOMContentLoaded', () => {
  dropdownRoles()
  sendDropDownRole()
  //event listener on clock in buttons div
  const clockInDiv = document.getElementById('clockInDiv')
  clockInDiv.addEventListener('click', (ev) => {
      console.log('clockin click');

    axios.get(`/shifts/user/${gactiveUserId}/current`)
    .then((shift) => {
      if(shift.data.previous_shift_today === true) {
        milesInput.value = 0
      }
    })
    let mileage = parseInt(milesInput.value)
    let roleId = parseInt(ev.target.id)



    let dataObject = {}
    dataObject['user_id'] = gactiveUserId
    dataObject['role_id'] = roleId
    dataObject['miles'] = mileage

    axios.post(`/shifts`, dataObject)
      .then((post) => {

        gactiveUserShiftId = post.data.shift.id
        checkStatus()
        const clockOutButton = document.getElementById('clockOutButton')


        clockOutButton.addEventListener('click', (ev) => {
          axios.patch(`/shifts/${gactiveUserShiftId}`)
          .then((shift) => {
            checkStatus()
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
    })
})


// <button class="dropdown-item" type="button">Cashier</button>
