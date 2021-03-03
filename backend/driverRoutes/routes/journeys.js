var express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../src/dbConnection');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.put('/', [
    check('startAddress')
        .not().isEmpty()
        .withMessage('is required'),
    check('stopAddress')
        .not().isEmpty()
        .withMessage('is required'),
    check('price')
        .not().isEmpty()
        .isDecimal()
        .withMessage('Is required, and has to be decimal'),
    check('date')
        .not().isEmpty()
        .withMessage('is required')
        .isDate()
        .withMessage('Should be a date in format YYYY/MM/DD')
], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(err => {
            console.log(`Err: ${err.param} ${err.msg}`);
        });
        throw new Error('Invalid input parameters');
    }
    const {startAddress, stopAddress, price, date } = req.body;
    db.serialize(() => {
        db.run(
            "INSERT INTO journeys(date,startAddress,stopAddress,price) VALUES(?,?,?,?)",
            [date,startAddress,stopAddress,price],
            (err) => {
                if(err) {
                    console.log(err);
                    throw new Error('Could not save the data');
                }
                res.status(200).send({message: 'Journey saved!'});
            });
    });
});

module.exports = router;
