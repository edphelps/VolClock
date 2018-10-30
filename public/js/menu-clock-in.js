
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

//get id from global variable
function getRoles() {
axios.get(`/users/${gactiveUserId}`)
.then((data) => {
  // console.log(data.data)
  let roles = data.data.roles

  //loop over array of objects (roles)
  for(let el of roles) {
    //for every roles object, if there are 3 or less roles, create a button, put role text on button
      let clockInButton = document.createElement('button')
      clockInButton.innerText = el.role
      clockInDiv.appendChild(clockInButton)
      clockInButton.setAttribute('class', "btn btn-primary btn-lg btn-block")
      clockInButton.setAttribute('type', "button")

    }

  // roles.forEach((el) => {
    //if .length <= 3 create the buttons and put text on them
    // console.log(el)
    // create button for each role
    //append button to div id="content--clock-in"
    //give class, id, and type attributes
    //inner text of button = role
    //otherwise do nothing
  // })
})
}
//then send role id to roles table to get the names of specific roles


//<button id="shift1" type="button" class="btn btn-primary btn-lg btn-block"></button>
