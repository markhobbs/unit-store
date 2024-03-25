var express = require('express');
var router = express.Router();
var value = require('../controller/value');

router.get('/count', value.count); 
router.get('/', value.list); 
router.post('/', value.create); 
router.get('/:station', value.findOne); 
router.get('/:station/details', value.findAll);

module.exports = router;