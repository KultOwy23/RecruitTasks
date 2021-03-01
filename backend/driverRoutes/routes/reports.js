const e = require('express');
var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.get('/daily', [
  check('date').not().isEmpty()
], function(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw Error('Invalid input');
  }

  const { date } = req.body;
  res.send('respond with a resource');
});

router.get('/daterange', [
  check('startDate')
    .not().isEmpty()
    .isDate()
    .withMessage('Should be date'),
  check('endDate')
    .not().isEmpty()
    .isDate()
    .withMessage('Should be date'),
], function(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw Error('Invalid input parameters');
  };
  const { startDate, endDate} = req.body;
});

module.exports = router;
