var express = require('express');
var router = express.Router();
var value = require('../controller/value');

//router.get('/', function (req, res, next) { res.send(':()') });
router.get('/count', value.count); 
router.get('/', value.list); 
router.post('/', value.create); 
//router.put('/', value.update); 

router.get('/:station', value.findOne); //Get single station by their filename eg.emails
router.get('/:station/details', value.findAll); //Get single station by their filename eg.emails

module.exports = router;