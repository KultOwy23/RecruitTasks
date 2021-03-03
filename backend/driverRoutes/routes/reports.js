const e = require('express');
var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.get('/daily', [
  check('date')
    .not().isEmpty()
    .isDate()
    .withMessage("Is required and has to be Date")
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
    .withMessage("is required and should be Date"),
  check('endDate')
    .not().isEmpty()
    .isDate()
    .withMessage('is required and should be Date'),
  check('startDate').custom((value, {req}) => {

    const { endDate } = req.body;
    console.log(`StarteDate type: ${Date(value)}`);
    console.log(`End date: ${Date(endDate)}`);
    if(endDate < value) {
      throw new Error('EndDate must be after the startDate')
    }

    return true;
  })
], function(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    errors.array().forEach(err => {
      console.log(`Err: ${err.param} ${err.msg}`);
    });
    throw Error('Invalid input parameters');
  };
  const { startDate, endDate} = req.body;
});

module.exports = router;
