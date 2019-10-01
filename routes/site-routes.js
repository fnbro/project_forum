const express = require('express');
const router  = express.Router();
const User = require("../models/user");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get('/sportsbook', (req, res, next) => {
  res.render('sportsbook');
});                              


module.exports = router;
