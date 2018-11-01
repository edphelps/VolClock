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
*  autoClockOut
*  Clock out any shifts from previous days with thrift store closing time
*  Returns a knex Promise
***************************************************** */
function autoClockOut() {
  console.log("autoClockOut");

  const aPromises = [];

  return knex('shifts')
    .where('start_time', '<', getDateToday())
    .whereNull('end_time')
    .then((aRecs) => {
      console.log('autoClose aRecs: ', aRecs);
      for (const oRec of aRecs) {
        const dtStartTime = new Date(oRec.start_time);
        const endTime = new Date(
          dtStartTime.getFullYear(),
          dtStartTime.getMonth(),
          dtStartTime.getDate(),
          17,30,0);
        aPromises.push(knex('shifts')
          .update({ end_time: endTime })
          .where('id', oRec.id));
      }
    })
    .then(() => Promise.all(aPromises));
}

/* **************************************************
*  GET /user/:user_id/current
*  Get shift record if user is currently clocked in.
*  If not clocked in, determine user was clocked in earlier in the day.
*
*  Return
*    if user currently clocked in
*      200: {
*        current_shift: { id, start, ... }
*      }
*    if user not currently clocked in
*      200: {
*        current_shift: null,
*        previous_shift_today: true / false
*      }
*
select id, user_id, role_id, start_time, end_time from shifts
http GET localhost:3000/shifts/user/2/current
***************************************************** */
router.get('/user/:user_id/current', (req, res, next) => {
  console.log("-- GET route shifts/user/:user_id/current: ", req.params.user_id);

  // check if user is currently clocked into a shift
  knex('shifts')
    .where('user_id', req.params.user_id)
    .where('start_time', ">", getDateToday())
    .whereNull('end_time')
    .then((aRecs) => {
      // console.log("--> qry returning: ", aRecs);

      // user is currently clocked in
      if (aRecs.length !== 0) {
        res.status(200).json({ current_shift: aRecs[0] });
        return;
      }

      // not clocked in, check if volunteer clocked in earlier in the day
      knex("shifts")
        .where('user_id', req.params.user_id)
        .where('start_time', ">", getDateToday())
        .whereNotNull('end_time')
        .then((aEarlierRecs) => {
          // console.log("** aRecs testing shift earlier today: ", aEarlierRecs);

          // clocked in earlier in the day
          if (aEarlierRecs.length) {
            res.status(200).json({ current_shift: "null", previous_shift_today: true });
            return;
          }

          // not clocked in earlier in the today
          res.status(200).json({ current_shift: "null", previous_shift_today: false });
        });
    })
    .catch((error) => {
      next(routeCatch(`--- GET route /user/${req.params.user_id}/current `, error));
    });
});


/* **************************************************
*  GET /user/:user_id
*  Get complete shift history for user + add the role text
*  Runs the autoClockOut() to ensure past days' shifts are clocked out
*  Return
*      200: {
*         shifts: [ { role, id (shift id), start, … }, { ... } ]
*         }
*      404: {
*         shifts: "null",
*         message: "no history for user"
*         }
*
http GET localhost:3000/shifts/user/2
***************************************************** */
router.get('/user/:user_id', (req, res, next) => {
  console.log("-- GET route shifts/user/:id: ", req.params.user_id);

  autoClockOut()
    // get all past shifts for user
    .then(() => {
      return knex('shifts')
        .join('roles', 'roles.id', 'role_id')
        .where('user_id', req.params.user_id)
        .select( [ 'shifts.*', 'roles.role'] )
    })
    .then((aRecs) => {
      // console.log("--> qry returning: ", aRecs);

      // user has no history
      if (aRecs.length === 0) {
        res.status(200).json({ shifts: "null", message: `user ${req.params.user_id} has no shift history` });
        return;
      }

      // return user's shift history
      res.status(200).json({ shifts: aRecs });
      return;
    })
    .catch((error) => {
      next(routeCatch(`--- GET route shifts/user/${req.params.user_id}`, error));
    });
  // // get all past shifts for user
  // knex('shifts')
  //   .join('roles', 'roles.id', 'role_id')
  //   .where('user_id', req.params.user_id)
  //   .select( [ 'shifts.*', 'roles.role'] )
  //   .then((aRecs) => {
  //     // console.log("--> qry returning: ", aRecs);
  //
  //     // user has no history
  //     if (aRecs.length === 0) {
  //       res.status(200).json({ shifts: "null", message: `user ${req.params.user_id} has no shift history` });
  //       return;
  //     }
  //
  //     // return user's shift history
  //     res.status(200).json({ shifts: aRecs });
  //     return;
  //   })
  //   .catch((error) => {
  //     next(routeCatch(`--- GET route shifts/user/${req.params.user_id}`, error));
  //   });
});

/* **************************************************
*  POST /
*  Clock-in, add a new shift record
*  @body user_id
*  @body role_id
*  @body miles
*  Return
*    200 { shift: { id, start_time, ... } }
http POST localhost:3000/shifts user_id=4 role_id=3 miles=99
***************************************************** */
router.post('', (req, res, next) => {
  console.log("-- POST route shifts/user/:id: ", req.params.user_id);
  const oParams = {
    user_id: 'int',
    role_id: 'int',
    // miles: 'string', OPTIONAL PARAM
  };
  if (!chkBodyParams(oParams, req, res, next))
    return;
  const oShift = {
    // id: not-passed-to-create-new-record
    user_id: req.body.user_id,
    role_id: req.body.role_id,
    miles: (req.body.miles) ? req.body.miles : "0",
    start_time: new Date(),
    // end_time: null until user clocks-out
  };

  // check that volunteer isn't already clocked in
  knex('shifts')
    .where('user_id', req.body.user_id)
    .where('start_time', ">", getDateToday())
    .whereNull('end_time')
    .then((aRecs) => {
      if (aRecs.length) {
        console.log("-- error, user already clocked in");
        const error = new Error(`unable to clock-in, already clocked in, shifts.id: ${aRecs[0].id}`);
        error.status = 401;
        throw error; // send to .catch() below.
                     // MUST throw to prevent following .then()'s from executing
      }
    })
    // clock-in / post new shift
    .then(() => {
      knex('shifts')
        .insert([oShift]) // param is in the format of the fields so use destructuring
        .returning('*') // gets array of the inserted records
        .then((aRecs) => {
          console.log("--> create returning: ", aRecs);
          res.status(201).json({ shift: aRecs[0] });
          return;
        });
    })
    .catch((error) => {
      next(routeCatch(`--- POST route shifts/user/${req.params.user_id}, error: `, error));
    });
});


/* **************************************************
*  PATCH /
*  Clock-out, add the end_time to an existing shift record
*  return
*    200 { message: "success" }
http PATCH localhost:3000/shifts/5
***************************************************** */
router.patch('/:id', (req, res, next) => {
  console.log("-- PATCH route shifts/:id: ", req.params.id);

  // check that shift exists and hasn't been clocked out already
  knex('shifts')
    .where('id', req.params.id)
    .then((aRecs) => {
      if (!aRecs.length) {
        console.log("-- PATCH route throw error, can't find shift");
        const error = new Error(`unable to clock-out, record not found for id: ${req.params.id}`);
        error.status = 401;
        throw error; // send to .catch() below.
                     // MUST throw to prevent following .then()'s from executing
      }
      if (aRecs[0].end_time) {
        console.log("-- PATCH route throw error, shift already clocked out");
        const error = new Error(`unable to clock-out, shift already clocked out for id: ${req.params.id}`);
        error.status = 401;
        throw error; // send to .catch() below.
                     // MUST throw to prevent following .then()'s from executing
      }
    })
    // clock-out the shift
    .then(() => {
      return knex('shifts')
        .update({ end_time: new Date() })
        .where('id', req.params.id)
        .where(`end_time`, null)
        .returning('*')
      })
    .then((aRecs) => {
      console.log("--> update 2 returning: ", aRecs);
      if (!aRecs.length) {
        console.log("-- PATCH 2 route throw error, shift already clocked out");
        const error = new Error(`unable to clock-out, shift already clocked out for id: ${req.params.id}`);
        error.status = 401;
        throw error; // send to .catch() below.
                     // MUST throw to prevent following .then()'s from executing
      }
      res.status(201).json({ shift: aRecs[0] });
      return;
    })
    .catch((error) => {
      next(routeCatch(`-- PATCH 3 ${req.params.id} route catch error: `, error));
    });
});

module.exports = router;
