// function to check login code
// check code is in database
// if it is in database then login div = display:none
// AND name of volunteer appears in appropriate places

const loginForm = document.getElementById('loginForm');
const loginCodePlaceHolder = document.getElementById('loginCode');
const errorParagraph = document.getElementById('errorParagraph');
const mainContainer = document.getElementById('mainContainer');
const loginContainer = document.getElementById('loginContainer');

// Attempt to login user from loginCode.
// If successful the user moves to the Clock In/Out page.
// If unsuccessful display error message and stay on login page.
function loginUser(loginCode) {
  // compare loginCode with codes in database
  axios.get(`users/login/${loginCode}`)
    .then((data) => {
      // if incorrect code, display error and stay on login form
      if(data.data.user === null) {
        errorParagraph.style.display = "inline-block";
      }

      // if correct code, login disappears, homepage appears
      if (data.data.user !== null) {

        // // clear the login code on the form for the next time it's shown
        // loginCodePlaceHolder.value = "";

        // change section visibility
        loginContainer.style.display = "none";
        mainContainer.style.display = "";

        // fill in global variable with the active user
        gactiveUserId = data.data.user.id;

        //gactiveUserShiftId = data.data.shift.id

        // move to the clock in or admin menu choice
        if (loginCode == ADMIN_USER_CODE) {
          console.log("&& loading admin");
          onMenuAdmin();
        } else {
          console.log("&& loading regulat");
          onMenuClockIn();
        }

        // set user name for homepage banner
        const welcome = document.getElementById('app-title');
        const firstName = data.data.user.fname;
        const lastName = data.data.user.lname;
        welcome.innerText = `Welcome ${firstName} ${lastName}!`;

        // // set user name for message to Supervisor
        // const notifyName = document.getElementById('notifyName');
        // notifyName.innerText = `From ${firstName} ${lastName}`;
        //
        // // set user name for time off
        // const nameTimeOff = document.getElementById('nameTimeOff');
        // nameTimeOff.innerText = `For ${firstName} ${lastName}`;

      }
    })
    .catch((error) => {
      console.log("AXIOS error: ", error);
    });
}

function onsubmitLogin() {
  console.log("onsubmitLogin");
  const loginCode = loginCodePlaceHolder.value;
  loginUser(loginCode);
}

/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
function onclickChangeUser() {

  // change section visibility
  loginContainer.style.display = "";
  mainContainer.style.display = "none";

  // clear the global variable with the active user
  gactiveUserId = null;

  // clear the login code
  loginCodePlaceHolder.value = "";

  // set focus to the login code
  loginCodePlaceHolder.focus();
}

/* ==================================================
*  DOM loaded, setup and set button event listener
* =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded in login.js");

  document.getElementById("change-user-button").onclick = onclickChangeUser;

  loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    onsubmitLogin();
  });

  // TODO: remove this, it short-circuits the login page to login Riley Burns
  loginUser("1234");
});
