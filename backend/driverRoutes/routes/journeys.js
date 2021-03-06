var express = require('express');
const { check, validationResult } = require('express-validator');
const { saveJourney } = require('../src/dbConnection');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.put('/', [
    check('originAddress')
        .not().isEmpty()
        .withMessage('is required'),
    check('destinationAddress')
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
    saveJourney(req.body, (err, _) => {
        if(err) {
            throw Error(`Save failed: ${err}`);
        }
        res.status(200).send({message: 'Saved journey!'});
    });
});

module.exports = router;
