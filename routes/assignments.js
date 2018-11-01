const express = require('express');
const knex = require('../knex');
const routeCatch = require('./routeCatch')
const { chkBodyParams } = require('./params'); // destructure the chkBodyParams out of require('./params') returned object

const router = express.Router();

/* **************************************************
*  getDateToday
*  Get just the date for today (with time of 00:00:00)
***************************************************** */
function getDateToday() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

/* **************************************************
*  GET /user/:user_id
*  Get repeating assgnments for user_id plus looks up the role text

*  The "dow" field is 0-based starting on Sunday (so )
*  Return
*      200: {
*         assignments: [ { role, id (assignments), start, … }, { ... } ]
*         }
*      404: {
*         assignments: "null",
*         message: "no repeatng assignments"
*         }
*
http GET localhost:3000/assignments/user/2
***************************************************** */
router.get('/user/:user_id', (req, res, next) => {
  console.log("-- GET route assignments/user/:id: ", req.params.user_id);

  // get all assignments for user
  knex('assignments')
    .where('user_id', req.params.user_id)
    .join('roles', 'roles.id', 'role_id')
    .select(['assignments.*', 'roles.role'])
    .then((aRecs) => {
      console.log("--> qry returning: ", aRecs);

      // user has no assignments
      if (aRecs.length === 0) {
        res.status(200).json({ assignments: "null", message: `user ${req.params.user_id} has no assignments` });
        return;
      }

      // return user's assignments
      res.status(200).json({ assignments: aRecs });
      return;
    })
    .catch((error) => {
      next(routeCatch(`--- GET route assigments/user/${req.params.user_id}`, error));
    });
});
module.exports = router;
