const express = require('express');
const router  = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get("/users/edit/:id", (req, res, next) => {
  const userId = req.params.id

  User.findOne({ _id: userId })
    .then(user => {
      console.log(user)
      if (user._id.equals(req.user._id)) {
        res.render("user-form", { user });
      } else {
        // no access for you!
        res.redirect(`/user/${user._id}`);
      }
      
    })
    .catch(error => {
      throw new Error(error);
    });
});