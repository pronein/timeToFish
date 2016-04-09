var express = require('express');
var passport = require('passport');
var log = require('../auxiliary/logger');

var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      log.error({err: err}, 'Error during authentication.');
      
      return next(err);
    }

    if (!user) {
      return res.sendStatus(401);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.sendStatus(200);
    });
  })(req, res, next);
});

module.exports = router;
