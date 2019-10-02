const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Team = require("../models/team");

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

router.get("/logout", (req, res, next) => {
  res.render("logout");
});


router.get('/sportsbook', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login');
    return;
  }
  Sportsbook.find({ userid: req.session.currentUser })
    .then(allMatches => {
      res.render('sportsbook', { allMatches });
    })
    .catch((err) => {
      res.redirect('/createSportsbook')
      console.log(err);
    })
});


router.get('/createSportsbook', (req, res, next) => {
  Team.find()
    .then(teams => {
      res.render('createSportsbook', { teams });
    })
    .catch((err) => {
      res.redirect('/createSportsbook')
      console.log(err);
    })

});

router.post('/createSportsbook', (req, res, next) => {
  const team1 = req.body.team1;
  const team2 = req.body.team2;
  if (team1 !== team2) {
    const { team1, team2, result } = req.body;
    const userid = req.session.currentUser;
    const newSportsbook = new Sportsbook({ team1, team2, result, userid });
    newSportsbook.save()
      .then((sportsbooks) => {
        res.redirect('/sportsbook');
      })
      .catch((err) => {
        res.redirect('/createSportsbook')
        console.log(err);
      })
  }
  else {
    res.redirect('/createSportsbook')
    console.log(`${team1} can't play against himself?`);
  }
})

router.get('/editSportsbook/:Id', (req, res, next) => {
  const matchId = req.params.Id;
  Team.find()
    .then(data => {
      Sportsbook.findById(matchId)
        .then(match => {
          match.currentResult =
          `
          <option value="1">Win Team 1</option>
          <option ${match.result === 'X' && ' selected '} value="X">Draw</option>
          <option ${match.result == 2 && ' selected '} value="2">Win Team 2</option>
          `
          const editData = { teams: data, match: match }
          console.log(editData.teams)
          res.render('editSportsbook', editData);
        })
        .catch((err) => {
          res.redirect('/createSportsbook')
          console.log(err);
        })
    });
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
  Sportsbook.findByIdAndRemove(matchId)
    .then((match) => {
      res.redirect('/sportsbook');
    })
    .catch((err) => {
      console.log(err);
    })
})

module.exports = router;
