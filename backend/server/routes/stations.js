var express = require('express');
var router = express.Router();
var station = require('../controller/station');

//router.get('/', function (req, res, next) { res.send(':()') });
router.get('/count', station.count); 
router.get('/', station.list); 
router.post('/', station.create); 
//router.put('/', station.update);

router.get('/:station', station.findOne); //Get single station by their filename eg.emails

module.exports = router;