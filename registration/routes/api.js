var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/register', function(req, res, next) {
  if (Math.random() < 0.75){
    res.send('ok');
  } else {
    res.status(500).send('imitating server error');
  }
});

module.exports = router;
