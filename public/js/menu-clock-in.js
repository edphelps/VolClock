
/* ==================================================
*  onMenuClockIn()
*
*  Menu selection
* =================================================== */
function onMenuClockIn() {
  changeMenuAndContentArea("nav--clock-in", gelemContentClockIn);


}
//ids for shift buttons (will click to clock in)
const shift1 = document.getElementById('shift1')

//get id from global variable
//send id to users_roles table to get role id
function getRoles() {
axios.get(`/users/${gactiveUserId}`)
.then((data) => {
  let roles = data.data.roles
  roles.forEach((el) => {
    shift1.innerText = el.role

    //if .length <= 3 create the buttons and put text on them
    //if item already on button do nothing 
    //otherwise do nothing
  })
})
}
//then send role id to roles table to get the names of specific roles
