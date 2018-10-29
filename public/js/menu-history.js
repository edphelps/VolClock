

/* ==================================================
*  onMenuHistory()
*
*  Menu selection
* =================================================== */
function onMenuHistory() {
  // changeMenuAndContentArea("nav--history", gelemContentHistory);
  console.log('hello')
  axios.get(`/users/${gactiveUserId}`)
    .then((response) => {
      console.log('response>>>', response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

onMenuHistory()
