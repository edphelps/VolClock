/*
    General utility functions
*/

/* ==================================================
*  displayErrorMessage()
*  Display error message to the user
* =================================================== */
function displayErrorMessage(sMessage) {
  // document.getElementById("error-message").innerText = sMessage;
}
/* ==================================================
*  clearErrorMessage()
*  Clear the error message display
* =================================================== */
function clearErrorMessage() {
  // document.getElementById("error-message").innerText = "";
}
/* ==================================================
*  handleError()
*
*  This is the front end part of the AXIOS full-stack error handling
*  to split apart the restructured error object for logging and display.
* =================================================== */
function handleError(sCalledFrom, error) {
  console.log(`---------- AJAX error in ${sCalledFrom} ----------`);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("message: ", error.response.data.error.message);
    console.log("error.response.data", error.response.data);
    console.log("error.response.status", error.response.status);
    console.log("error.response.headers", error.response.headers);
    if (error.response.data.error) {
      displayErrorMessage(error.response.data.error.message);
    } else {
      displayErrorMessage("AJAX error (1)");
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("error.request", error.request);
    displayErrorMessage("AJAX error (2)");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('error.message: ', error.message);
    displayErrorMessage(error.message);
  }
  console.log("error.config", error.config);
  console.log("^^^^^^^^^^ AJAX error ^^^^^^^^^^^^^^^^^^^^");
}

/* ==================================================
*  cancelPendingAjaxLoad()
*
*  Called by a page before it launches an AJAX request for data.  This
*  is important to prevent user from clicking the menu selection for the
*  page multuple times OR movine from one page to another while the first
*  page is still loading (we wouldn't want the first page to start loading
*  the DOM when its AJAX call returned while the user is viewing the 2nd page).
* =================================================== */
function cancelPendingAjaxLoad() {
  if (goCancelAjax) {
    console.log("Cancelling current AJAX call");
    goCancelAjax.cancel();
    goCancelAjax = null;
  }
}

/* ==================================================
*  changeMenuAndContentArea()
*
*  Menu choice onClick event handers call this function to
*  set the correct menu choice active and display the
*  correct content area.  The onClick handler must still
*  dynamically fill the content area.  All other content
*  areas will be hidden.
*
*  @param sMenuBtnID (string) ID for the menu button so it can be selected
*  @param elemConten (html element) the content area to unhide.
* =================================================== */
function changeMenuAndContentArea(sMenuBtnID, elemContent) {

  // When moving to a menu need to clear the timer that the clockin page sets
  // that kick user to the login page when they are inactive for too long.
  clearClockinTimeout();

  // hide all content sections
  const aElemContent = document.querySelectorAll(".content");
  for (const elem of aElemContent) {
    elem.setAttribute("hidden", true);
  }

  // Remove the content from div's with class "auto-clear".
  // When generating dynamic content you may be assiging id's
  // to the elements as you add them.  If two dynamically generated
  // 'pages' create the same element id's they will break the ability
  // to do DOM manipulation since id's are suppossed be unique.
  const aElemAutoClear = document.querySelectorAll(".auto-clear");
  for (const elem of aElemAutoClear) {
    elem.innerHTML = "";
  }

  // set all menu buttons inactive
  const aElemNavLink = document.querySelectorAll(".nav-link");
  for (const elemNavLink of aElemNavLink) {
    elemNavLink.classList.remove("active");
  }

  // set current menu choice active
  document.getElementById(sMenuBtnID).classList.add("active");

  // show menu's content area
  elemContent.removeAttribute("hidden");
}

/* ==================================================
*  hasLocalStorageSupport()
*
*  Checks is localStorage is supported, which it's not in Safari
*
*  @return t/f
* =================================================== */
function hasLocalStorageSupport() {
  let bLocalStorageSupport = false;
  try {
    const testKey = 'safari-issue';
    localStorage.setItem(testKey, 'foo');
    localStorage.removeItem(testKey);
    bLocalStorageSupport = true;
  } catch (e) {
    bLocalStorageSupport = false;
  }
  return bLocalStorageSupport;
}
