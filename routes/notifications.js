const express = require('express');

const router = express.Router();

/* **************************************************

***************************************************** */
router.get('/', (req, res, next) => {
  res.send('Notificartions responds with a resource');
});

module.exports = router;
