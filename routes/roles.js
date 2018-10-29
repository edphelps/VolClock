const express = require('express');
const router = express.Router();
const knex = require('../knex')

/* GET . */
router.get('/', (req, res, next) => {
<<<<<<< HEAD
  res.send('Roles responds with a resource');
});

=======
  knex('roles')
    .then((results) => {
      res.json({ roles: results })
    })
    .catch((error) => {
     console.log("%%% knex:readAll error :", error);
    throw new Error(error.message); // send to caller's .catch()
    })
})
>>>>>>> TA
module.exports = router;
