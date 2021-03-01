var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/',function(req, res, next){
    const {startAddress, stopAddress, price, date} = req.body;
    if(!startAddress) {
        throw Error('Invalid input parameters');
    }
});

module.exports = router;
