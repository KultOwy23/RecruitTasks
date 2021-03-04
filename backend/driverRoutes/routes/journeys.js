var express = require('express');
const { check, validationResult } = require('express-validator');
const { saveJourney } = require('../src/dbConnection');
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
    check('price').isDecimal()
        .withMessage('Is required, and has to be decimal'),
    check('date').isDate()
        .withMessage('Should be a date in format YYYY/MM/DD')
], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(err => {
            console.log(`Err: ${err.param} ${err.msg}`);
            throw new Error('Invalid input parameters');
        });
    }
    try {
        const { startAddress, stopAddress, price, date } = req.body;
        saveJourney(startAddress, stopAddress, price, date);
        res.status(200).send({message: 'Saved journey!'});
    } catch(err) {
        throw new Error(`Save failed: ${err}`);
    }


});

module.exports = router;
