const express = require('express');
const router = express.Router();
const User = require("../models/user");

const Sportsbook = require('../models/sportsbook');

const session = require("express-session");
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
  Sportsbook.find()
    .then(allMatches => {
      res.render('sportsbook', { allMatches });
    })
    .catch((err) => {
      res.redirect('/createSportsbook')
      console.log(err);
    })
});

router.get('/createSportsbook', (req, res, next) => {
  res.render('createSportsbook');
});

router.post('/createSportsbook', (req, res, next) => {
  const { team1, team2, result } = req.body;
  const newSportsbook = new Sportsbook({ team1, team2, result });
  newSportsbook.save()
    .then((sportsbooks) => {
      res.redirect('/sportsbook');
    })
    .catch((err) => {
      res.redirect('/createSportsbook')
      console.log(err);
    })
})

router.get('/editSportsbook/:Id', (req, res, next) => {
  const matchId = req.params.Id;
  Sportsbook.findById(matchId)
    .then(match => {
      match.example =
        `
        <option value="1">Win Team 1</option>
        <option ${match.result === 'X' &&' selected '} value="X">Draw</option>
        <option ${match.result == 2 &&' selected '} value="2">Win Team 2</option>
      `
      res.render('editSportsbook', match);
    })
    .catch((err) => {
      res.redirect('/createSportsbook')
      console.log(err);
    })
});

router.post('/editSportsbook/:Id', (req, res, next) => {
  const { team1, team2, result } = req.body;
  const matchId = req.params.Id;
  Sportsbook.updateOne({ _id: matchId }, { $set: { team1, team2, result } })
    .then(match => {
      res.redirect('/sportsbook');
    })
    .catch((err) => {
      res.redirect('/sportsbook')
      console.log(err);
    })
})

router.post('/deleteSportsbook/:Id', (req, res, next) => {
  const matchId = req.params.Id;
  console.log("Now i delete")
  Sportsbook.findByIdAndRemove(matchId)
  .then((match) => {
    console.log("Ill delete------")
    res.redirect('/sportsbook');
  })
  .catch((err) => {
    console.log(err);
  })
})

module.exports = router;
