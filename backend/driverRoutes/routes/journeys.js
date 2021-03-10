var express = require('express');
const { check, validationResult } = require('express-validator');
const { saveJourney } = require('../src/dbConnection');
var router = express.Router();

router.post('/', [
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
        res.status(500).json({errors: errors.array()});
    } else {
        saveJourney(req.body).then(saved => {
            res.status(200).send(saved)
        }).catch(err => {
            throw Error(err);
        })
    }
});

module.exports = router;
