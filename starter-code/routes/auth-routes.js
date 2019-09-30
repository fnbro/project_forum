const express = require('express');
const router  = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get('/signup', (req, res, next) => {
    res.render('signup');
  });
  
  router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    if (username === "" || password === "") {
      res.render("signup", {
        errorMessage: "Indicate a username and a password to sign up"
      });
      return;
    }
    User.findOne({ "username": username })
      .then(user => {
        if (user !== null) {
          res.render("signup", {
            errorMessage: "The username "+username+" already exists!"
          });
          return;
        }
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        User.create({
          username,
          password: hashPass
        })
          .then(() => {
            res.redirect("/");
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        next(error);
      })
  });
  

  router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });


  module.exports = router;
