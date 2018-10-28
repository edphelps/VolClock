const express = require('express');

const router = express.Router();

/* GET . */
router.get('/', (req, res, next) => {
  res.send('Roles responds with a resource');
});

module.exports = router;
