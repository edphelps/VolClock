//function to check login code
//check code is in database
//if it is in database then login div = display:none
//AND name of volunteer appears in appropriate places


const loginForm = document.getElementById('loginForm')
const loginCodePlaceHolder = document.getElementById('loginCode')
const errorParagraph = document.getElementById('errorParagraph')
const mainContainer = document.getElementById('mainContainer')
const loginContainer = document.getElementById('loginContainer')

  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let loginCode = loginCodePlaceHolder.value

    //compare loginCode with codes in database
    axios.get('users/login/' + loginCode)
    .then((data) => {
      console.log('kkkkkkkkkkk', data)
      if(data.data.user === null){
        errorParagraph.style.display = "inline-block"
      }

      //if correct code, login disappears, homepage appears
      if(data.data.user !== null) {
        loginContainer.style.display = "none"
        mainContainer.style.display = ""
        gactiveUserId = data.data.user.id
        onMenuClockIn()

        //set name for homepage banner
        let welcome = document.getElementById('app-title')
        let firstName = data.data.user.fname
        let lastName = data.data.user.lname
        welcome.innerText = `Welcome ${firstName} ${lastName}!`

        //set name for message to Supervisor
        let notifyName = document.getElementById('notifyName')
        notifyName.innerText = `From ${firstName} ${lastName}`

        //set name for time off
        let nameTimeOff = document.getElementById('nameTimeOff')
        nameTimeOff.innerText = `For ${firstName} ${lastName}`
        getRoles()
      }
    })
    .catch((error) => {
     console.log(error)
    })
  })
