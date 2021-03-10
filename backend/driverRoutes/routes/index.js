var express = require('express');
var router = express.Router();
const { calculateDistance } = require('../src/dbConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DriverRoutes API'});
});

module.exports = router;
