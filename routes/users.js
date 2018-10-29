const express = require('express')
const router = express.Router()
const knex = require('../knex')

/* GET users listing. */
router.get('/login/:login_code', (req, res, next) => {
  knex('users')
    .where('login_code', req.params.login_code)
    .then((result) => {
      if (!result.length) { res.status(200).json({ user: null })}
      res.json({ user: result[0] })
    })
    .catch((error) => {
     console.log("%%% knex:readAll error :", error);
    throw new Error(error.message); // send to caller's .catch()
   })
})

router.get('/:user_id', (req, res, next) => {
  let userRoles = {
    user: {},
    roles: [],
  }
  knex('users')
    .where('users.id', req.params.user_id)
    .returning('*')
    .then((user) => {
      knex('users_roles')
        .join('roles', 'roles.id', 'users_roles.role_id')
        .where('user_id', req.params.user_id)
        .returning(['roles.id', 'roles.role'])
        .then((result) => {
              res.status(200).send({ user: user[0], roles: result })
        })
    })
})



module.exports = router;
