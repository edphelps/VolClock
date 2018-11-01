
/* ==================================================
*  onMenuClockIn()
*
*  Menu selection
* =================================================== */
function onMenuClockIn() {
  changeMenuAndContentArea("nav--clock-in", gelemContentClockIn);
  checkStatus()
  getGActiveUserId()
  getRoles()
  changeRoleParagaraph()
}

//html elements
const roleParagraph = document.getElementById('roleParagraph')
const dropDown = document.getElementById('dropdownRoles')
const clockInDiv = document.getElementById('clockInDiv')
const clockOutDiv = document.getElementById('clockOutDiv')
const milesInput = document.getElementById('miles')
const clockInSuccess = document.getElementById('clockInSuccess')
const milesForm = document.getElementById('milesForm')
const somethingElse = document.getElementById('somethingElse')
const roleDropper = document.getElementById('roleDropper')
const clockInPrompt = document.getElementById('clockInPrompt')
const seperatorLine = document.getElementById('seperatorLine')

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
    }
  })
}

//function for sending post request to db from drop down menu list item
function sendDropDownRole() {
  dropDown.addEventListener('click', (ev) => {

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
        changeRoleParagaraph()
      })
      .catch(error => {
        console.log(error)
      })
  })
}


//sends an end time to db when clock out button is clicked
function clockOutPatch() {
  const clockOutButton = document.getElementById('clockOutButton')
  clockOutButton.addEventListener('click', (ev) => {
    somethingElse.style.display = ""
    roleDropper.style.display = ""
    location.reload()
    axios.patch(`/shifts/${gactiveUserShiftId}`)
    .then((shift) => {
      checkStatus()
    })
    .catch((error) => {
      console.log(error)
    })
  })
}


//creates buttons with roles and inputs default miles
function getRoles() {
  axios.get(`/users/${gactiveUserId}`)
  .then((data) => {
    let roles = data.data.roles
    roles.sort((a,b) => {
      return a.role - b.role || a.role.localeCompare(b.role)
    })
    let miles = data.data.user.miles_default
    milesInput.value = miles
  //loop over roles array and create buttons with role names
  for(let el of roles) {
    // console.log(el.id)
      let clockInButton = document.createElement('button')
      clockInButton.innerText = el.role
      clockInDiv.appendChild(clockInButton)
      clockInButton.setAttribute('class', "btn btn-success btn-lg btn-block ")
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
      somethingElse.style.display = "none"
      roleDropper.style.display = "none"
      clockInPrompt.style.display = "none"
      seperatorLine.style.display = "none"
    }
    if (shift.data.current_shift.end_time !== null){
      clockInDiv.style.display = ""
      clockOutDiv.style.display = "none"
      clockInSuccess.style.display = "none"
      milesForm.style.display = ""
      clockInPrompt.style.display = ""
      seperatorLine.style.display = ""
      somethingElse.style.display = ""
      roleDropper.style.display = ""
    }
    if(shift.data.previous_shift_today === true){
      milesForm.style.display = "none"
      milesInput.value = 0
    }
  })
  .catch((eror) => {
    console.log(error)
  })
}

//DOMContentLoaded.
document.addEventListener('DOMContentLoaded', () => {
  // getGActiveUserId()
  dropdownRoles()
  sendDropDownRole()
  clockOutPatch()
  //event listener on clock in buttons div. hides dropdown div when button is clicked
  const clockInDiv = document.getElementById('clockInDiv')
  clockInDiv.addEventListener('click', (ev) => {
    axios.get(`/shifts/user/${gactiveUserId}/current`)
    .then((shift) => {
      console.log(shift);

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
        changeRoleParagaraph()
      })
      .catch(error => {
        console.log(error)
      })
    })
})

//grabs active users current shift when login submit is clicked and sets the gactiveUserShiftId
//global variable to their current shift
//this is called in the onMenuClockIn function which is called when the login button is clicked
function getGActiveUserId(){
  axios.get(`/shifts/user/${gactiveUserId}/current`)
  .then((shift) => {
    if(shift.data.previous_shift_today === true) {
      milesInput.value = 0
    }
    gactiveUserShiftId = shift.data.current_shift.id

  })
  .catch((err) => {
    console.log(err)
  })
}

//changes paragraph text to match role that they clock in as. called when clock in button is clicked
//and called in onMenuClockIn so that it updates when a new user logs in
function changeRoleParagaraph() {
  axios.get(`/shifts/user/${gactiveUserId}/current`)
  .then((shift) => {
    if(shift.data.previous_shift_today === true) {
      milesInput.value = 0
    }
    roleParagraph.innerText = `Clocked-in: ${shift.data.current_shift.role}`
  })
  .catch((err) => {
    console.log(err)
  })
}
