const e = require('express');
var express = require('express');
const { check, query, validationResult } = require('express-validator');
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
    res.status(500).json({errors: errors.array()});
  } else {
    const { date } = req.query;
    dbConn.getDailyReport(date).then(report => {
      res.status(200).send(report);
    }).catch(err => {
      throw Error(err);
    })
  }
});

router.get('/daterange', [
  check('endDate').toDate(),
  check('startDate').toDate().custom((startDate, {req}) => {
    const { endDate } = req.query;
    const errors = [];
    if(!startDate) {
      errors.push('StartDate is required and has to be date');
    } 
    if(!endDate) {
      errors.push('EndDate is required and has to be date');
    }
    if(errors.length > 0) {
      throw new Error(errors.join(','));
    }
    if(startDate.getTime() >= endDate.getTime()) {
      errors.push('EndDate must be after the startDate');
    }
    if(errors.length > 0) {
      throw new Error(errors.join(','));
    }
    return true;
  })
], function(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(500).json({ errors: errors.array()});
  } else {
    dbConn.getDateRangeReport(req.query).then(report => {
      res.status(200).send(report)
    }).catch(err => {
      throw Error(err);
    })
  }
  
});

module.exports = router;
