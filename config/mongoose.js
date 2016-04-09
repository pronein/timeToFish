var config = require('./config');
var mongoose = require('mongoose');

function mongooseConfig() {
  var db = mongoose.connect(config.db);

  require('../models/user.server.model');

  return db;
}

module.exports = mongooseConfig;