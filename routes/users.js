const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Users Route responding with a resource');
});

module.exports = router;
