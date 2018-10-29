const express = require('express');
const knex = require('../knex')

const routeCatch = require('./routeCatch');
const router = express.Router();

/* **************************************************
*  GET /
*  Get all roles
*  Return
*    200: { notifications: [ { id, user_id, start_date, ... }, { id, user_id, start_date, ... } ]
http GET localhost:3000/roles/
***************************************************** */
router.get('/', (req, res, next) => {
  knex('roles')
    .then((results) => {
      res.status(200).json({ roles: results });
    })
    .catch((error) => {
      next(routeCatch(`--- GET roles/ route`, error));
    });
});
module.exports = router;
