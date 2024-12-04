const express = require('express');
const router = express.Router();
const station = require('../controller/station');
const { check, validationResult } = require('express-validator');

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/count', station.count);

router.get('/', station.list);

router.post(
  '/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('location').notEmpty().withMessage('Location is required')
  ],
  validate,
  station.create
);

router.get(
  '/:station',
  [
    check('station').isMongoId().withMessage('Invalid station ID')
  ],
  validate,
  station.findOne
);

module.exports = router;