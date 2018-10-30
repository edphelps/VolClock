const express = require('express');
const knex = require('../knex');
const routeCatch = require('./routeCatch');
const { chkBodyParams } = require('./params'); // destructure the chkBodyParams out of require('./params') returned object

const router = express.Router();

/* **************************************************
*  GET /user/:user_id
*  Get all notifications sent by the user
*  Return
*    200 { notifications: [ { id, user_id, start_date, ... }, { id, user_id, start_date, ... } ]
http GET localhost:3000/notifications/user/4
***************************************************** */
router.get('/user/:user_id', (req, res, next) => {
  console.log(`-- GET /user/${req.param.user_id} route notifications`);
  knex("notifications")
    .where('user_id', req.params.user_id)
    .then((aRecs) => {
      res.status(200).json({ notifications: aRecs });
    })
    .catch((error) => {
      next(routeCatch(`--- GET /user/${req.params.user_id} route`, error));
    });
});

/* **************************************************
*  DELETE /:id
*  Delete a notification
*  Return, the deleted record
http DELETE localhost:3000/notifications/2
***************************************************** */
router.delete('/:id', (req, res, next) => {
  return knex('notifications')
    .del()
    .where('id', req.params.id)
    .returning('*')
    .then((aRecs) => {
      // check if id not found
      if (!aRecs.length) {
        console.log(`--- notifications delete ${req.params.id} -- rec not found`);
        const error = new Error(`unable to delete, ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }
      // return notifcation that was deleted
      res.status(200).json(aRecs[0]);
    })
    .catch((error) => {
      next(routeCatch(`--- DELETE /notifications/${req.params.id}  route`, error));
    });
});

/* **************************************************
*  PUT /:id
*  Update notification record with user edits
*  @body start_date - optional, start and end for time-off requests
*  @body end_date - optional
*  @body comment
*  Return
*    201 { shift: { id, start_time, ... } }
http PUT localhost:3000/notifications/5 start_date='12/31/2018' end_date='01/31/2019' comment='CHANGED'
***************************************************** */
router.put('/:id', (req, res, next) => {
  console.log(`-- PUT route notifications ${req.params.id}`);

  const oParams = {
    start_date: 'string',
    end_date: 'string',
    comment: 'string',
  };
  if (!chkBodyParams(oParams, req, res, next))
    return;

  // check that start_date <= end_date

  knex('notifications')
    .update({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      comment: req.body.comment,
    })
    .where('id', req.params.id)
    .returning('*')
    .then((aRecs) => {
      console.log("--> update returning: ", aRecs);
      if (!aRecs.length) {
        console.log(`--- notifications put ${req.params.id} -- rec not found`);
        const error = new Error(`unable to update, ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }
      res.status(201).json({ notification: aRecs[0] });
    })
    .catch((error) => {
      next(routeCatch(`--- PUT route /notification for ${req.params.user_id}`, error));
    });
});

/* **************************************************
*  POST /
*  Add a new notification record
*  @body user_id
*  @body start_date - optional, start and end for time-off requests
*  @body end_date - optional
*  @body comment
*  Return
*    201 { shift: { id, start_time, ... } }
http POST localhost:3000/notifications user_id=4 start_date='12/26/2018' end_date='1/3/2019' comment='test comment'
***************************************************** */
router.post('/', (req, res, next) => {
  console.log("-- POST route notifications");
  // const oComment = {
  //   user_id: req.body.user_id,
  //   start_date: req.body.start_date,
  //   end_date: req.body.end_date,
  //   comment: req.body.comment,
  // };
  // console.log("POST received: ", oComment);

  const oParams = {
    user_id: 'int',
    comment: 'string',
  };
  if (!chkBodyParams(oParams, req, res, next)) {
    return;
  }

  // check that start_date <= end_date

  const oNotification = {
    user_id: req.body.user_id,
    comment: req.body.comment,
  };

  // start and end dates are optional
  if (req.body.start_date) oNotification.start_date = req.body.start_date;
  if (req.body.end_date) oNotification.end_date = req.body.end_date;

  // console.log("");
  // console.log("POST inserting: ", oNotification);
  // console.log("");
  knex('notifications')
    .insert(oNotification)
    .returning(['id', 'user_id', 'start_date', 'end_date', 'comment'])
    .then((data) => {
      res.status(201).json({ message: "success!", notification: data[0] });
    })
    .catch((error) => {
      next(routeCatch(`--- POST route /notification for ${req.params.user_id}`, error));
    });
});

module.exports = router;
