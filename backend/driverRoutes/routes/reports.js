const e = require('express');
var express = require('express');
const { check, body, validationResult } = require('express-validator');
const  dbConn  = require('../src/dbConnection');
var router = express.Router();

// const dailySql = "SELECT SUM(price) as totalPrice, SUM(distance) as totalDistance FROM journeys WHERE date = ?";

/* GET users listing. */
router.get('/daily', [
  check('date')
    .isDate()
    .withMessage('has to be date')
], function(req, res, next) {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw Error('Invalid input');
  }
  const { date } = req.body;
  
  report = dbConn.getDailyReport(date, (err,report) => {
    if(err) {
      throw Error(err);
    }
    console.log(`Report: ${report}`);
    res.status(200).send(report);
  });
});

router.get('/daterange', [
  body('endDate').toDate(),
  check('startDate').toDate().custom((startDate, {req}) => {
    const { endDate } = req.body;
    if(!startDate) {
      throw new Error('StartDate is required');
    } 
    if(!endDate) {
      throw new Error('EndDate is required');
    }
    if(startDate.getTime() >= endDate.getTime()) {
      throw new Error('EndDate must (startDate, endDatebe after the startDate');
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
  
  dbConn.getDateRangeReport(req.body, (err, report) => {
    if(err) {
      console.log(err);
      throw Error(err);
    }
    res.status(200).send(report);
  });
});

module.exports = router;
