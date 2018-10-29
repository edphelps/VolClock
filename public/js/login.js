//function to check login code
//check code is in database
//if it is in database then login div = display:none
//AND name of volunteer appears in appropriate places

//if it is not in database, throw error
const loginForm = document.getElementById('loginForm')
const loginCodePlaceHolder = document.getElementById('loginCode')



  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let loginCode = loginCodePlaceHolder.value

    //compare loginCode with codes in database
    axios.get('users/login/' + loginCode)
    .then((data) => {
      console.log('kkkkkkkkkkk', data.data)
    })
    .catch((error) => {
      if(error) window.alert('nope!')
      console.log(error)
    })

  })
