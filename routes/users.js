const express = require('express')
const router = express.Router()
const knex = require('../knex')

/* GET users listing. */
router.get('/login/:login_code', (req, res, next) => {
  knex('users')
    .where('login_code', req.params.login_code)
    .then((result) => {
      if (!result.length) { res.status(404).json({ user: null })}
      res.json({ user: result[0] })
    })
    .catch((error) => {
     console.log("%%% knex:readAll error :", error);
    throw new Error(error.message); // send to caller's .catch()
   })
})

router.get('/:user_id', (req, res, next) => {
  knex('users')
    .where('id', req.params.user_id)
    .returning('*')
    .then((user) => {
      return knex('users_roles')
      let userId = user.id
        .join('roles', 'roles.id', 'users_roles.role_id')
        .where('users_roles.user_id', userId)
        .then((roles) => {
          user.roles = roles
          return user
        })
      // console.log('req.params>>>', req.params)
      // console.log('user>>>', user)
      res.send({ user: user[0] })
    })

})



module.exports = router;
