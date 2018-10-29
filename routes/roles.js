const express = require('express');
const router = express.Router();
const knex = require('../knex')

/* GET users listing. */
router.get('/', (req, res, next) => {
  knex('roles')
    .then((results) => {
      res.json({ roles: results })
    })
    .catch((error) => {
     console.log("%%% knex:readAll error :", error);
    throw new Error(error.message); // send to caller's .catch()
    })
})
module.exports = router;
