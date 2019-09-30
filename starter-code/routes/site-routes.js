const express = require('express');
const router  = express.Router();
const User = require("../models/user");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

module.exports = router;
