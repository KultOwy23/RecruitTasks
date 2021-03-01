var express = require('express');
const { check, validationResult } = require('express-validator');
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
        .withMessage('is required')
        .not().isNumeric()
        .withMessage('should be numeric'),
    check('date')
        .not().isEmpty()
        .withMessage('is required'),
], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(err => {
            console.log(`Err: ${err.param} ${err.msg}`);
        });
        throw new Error('Invalid input parameters');
    }
    const {startAddress, stopAddress, price, date} = req.body;
});

module.exports = router;
