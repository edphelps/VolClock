const express = require('express');

const router = express.Router();

/* **************************************************
*  GET /user/:user_id/current
*  Determine is user is currently logged in
http GET localhost:3000/shifts/user/2/current
***************************************************** */
router.get('/user/:id/current', (req, res, next) => {
  console.log("-- user/:id/current: ", req.params.id);req.params.id
  res.status(200).json("user not logged in");
});

module.exports = router;
