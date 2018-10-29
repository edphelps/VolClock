
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
const shift2 = document.getElementById('shift2')
const shift3 = document.getElementById('shift3')

//function calls



function getShifts() {
axios.get('/user/:user_id/current')
.then((data) => {
 console.log(data)
})
}

getShifts()
