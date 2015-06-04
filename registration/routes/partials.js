var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:view', function(req, res, next) {
  var view = req.params.view;
  console.log(req.params);
  res.render(view);
});

module.exports = router;
