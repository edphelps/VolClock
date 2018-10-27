/*
    General utility functions
*/

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
