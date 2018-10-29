const express = require('express');

const router = express.Router();
const knex = require('../knex');
const routeCatch = require('./routeCatch');

/* **************************************************
*  GET /login/:login_code
*  Lookup login_code:
*     If found, return user object
*     If not found, return user = "null"
*  Return
*    200 { user: { id, fname, ... } }
*    200 { user: "null" }
http GET localhost:3000/users/login/0000
***************************************************** */
router.get('/login/:login_code', (req, res, next) => {
  knex('users')
    .where('login_code', req.params.login_code)
    .then((result) => {
      if (!result.length) { res.status(200).json({ user: null })}
      res.json({ user: result[0] })
    })
    .catch((error) => {
      next(routeCatch(`--- GET /login/${req.params.user_id} route`, error));
    });
})

/* **************************************************
*  GET /:id
*  Lookup login_code:
*     If found, return user object
*     If not found, return user = "null"
*  Return
*    200 { user: { id, fname, ... } }
*    200 { user: "null" }
http GET localhost:3000/users/2
***************************************************** */
router.get('/:id', (req, res, next) => {
  let userRoles = {
    user: {},
    roles: [],
  }
  knex('users')
    .where('users.id', req.params.id)
    .returning('*')
    .then((user) => {
      if (!user.length) {
        console.log(`--- users get ${req.params.id} -- rec not found`);
        const error = new Error(`unable to get user ${req.params.id}, not found`);
        error.status = 404;
        throw error;
      }
      knex('users_roles')
        .join('roles', 'roles.id', 'users_roles.role_id')
        .where('user_id', req.params.id)
        .returning(['roles.id', 'roles.role'])
        .then((result) => {
          res.status(200).send({ user: user[0], roles: result })
        })
        .catch((error) => {
          next(routeCatch(`--- GET /user/${req.params.user_id} route`, error));
        });
    })
    .catch((error) => {
      next(routeCatch(`--- GET /user/${req.params.user_id} route`, error));
    });
})



module.exports = router;
