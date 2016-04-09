var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  return new LocalStrategy(
      function (username, password, done) {
        // Find user, return done(null, user) or done(err) on failure
        // done(null, false) is an appropriate failure (not authenticated)
        return done(null, false);
      });
};
