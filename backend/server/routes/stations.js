var express = require('express');
var router = express.Router();
var station = require('../controller/station');

router.get('/count', station.count); 
router.get('/', station.list); 
router.post('/', station.create); 
router.get('/:station', station.findOne);

module.exports = router;