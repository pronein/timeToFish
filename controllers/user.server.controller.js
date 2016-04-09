var User = require('mongoose').model('User');
var log = require('../auxiliary/logger');

module.exports = {
  create: createUser
};

function createUser(req, res, next) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      log.error({err: err}, 'Error during creation of user.');

      res.status(500).json({msg: 'Failed to create new user.'});
    }
    else {
      res.json(user);
    }
  });
}