const express = require('express');
const knex = require('../knex')

const router = express.Router();

/* **************************************************

***************************************************** */
router.post('/', (req, res, next) => {
  knex('notifications')
      .insert({
        'user_id': req.body.user_id,
        'start_date': req.body.start_date,
        'end_date': req.body.end_date,
        'comment': req.body.comment
      })
      .returning(['user_id', 'start', 'end', 'comment'])
      .then((data) => {
        res.status(200).json({ message: "success!", posted_data: data[0]})
      })
      .catch((err) => {
        console.log(err)
      })
    })



module.exports = router;
