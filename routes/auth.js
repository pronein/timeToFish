var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.sendStatus(400);
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
