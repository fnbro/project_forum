const express = require('express');
const router  = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

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
    res.render("login");
  });

  router.post("/login", (req, res, next) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;
  
    if (theUsername === "" || thePassword === "") {
      res.render("login", {
        errorMessage: "Please enter both, username and password to sign up."
      });
      return;
    }
  
    User.findOne({ "username": theUsername })
    .then(user => {
        if (!user) {
          res.render("login", {
            errorMessage: "The username doesn't exist or the password is incorrect."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, user.password)) {
          req.session.currentUser = user;
          res.redirect("/");
        } else {
          res.render("login", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });
  


  module.exports = router;
