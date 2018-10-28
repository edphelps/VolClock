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

module.exports = router;
