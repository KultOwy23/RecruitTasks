const e = require('express');
var express = require('express');
const { check, body, validationResult } = require('express-validator');
const { db } = require('../src/dbConnection');
var router = express.Router();

const dailySql = "SELECT SUM(price) as totalPrice FROM journeys WHERE date = ?";

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
  db.serialize(() => {
    db.get(dailySql, date, (err, row) => {
      if(err) {
        throw err;
      }
      let report = {}
      if(row.totalPrice) {
        report = row;
      }
  
      res.status(200).send(report);
    })
  })
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
      throw new Error('EndDate must be after the startDate');
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
  const { startDate, endDate } = req.body;

  // let report = dbConn.getReportForDateRange(startDate, endDate);
  res.status(200).send({});
});

module.exports = router;
