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

router.get('/secret', (req, res, next) => {
  console.log(req.session.currentUser)
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  res.render('secret');
});                              


module.exports = router;
