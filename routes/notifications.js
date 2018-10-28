const express = require('express');

const router = express.Router();

/* **************************************************
*  GET /users/:login/:login_code
*  Return:
*     200: { user: { id, fname, ...}  // if login_code found
*     404: { user: null } // if login_code not found
http GET localhost:3000/users/:login_code
***************************************************** */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
