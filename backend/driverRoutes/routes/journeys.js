var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.put('/', [
    check('startAddress').not().isEmpty(),
    check('stopAddress').not().isEmpty(),
    check('price').not().isEmpty(),
    check('date')
        .not().isEmpty()
        .isDate()
        .withMessage('Should be date'),
], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new Error('Invalid input parameters');
    }
    const {startAddress, stopAddress, price, date} = req.body;
});

module.exports = router;
