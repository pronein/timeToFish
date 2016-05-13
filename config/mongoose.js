var config = require('./config');
var mongoose = require('mongoose');

function mongooseConfig() {
  var db = mongoose.connect(config.db);

  require('../models/permission.server.model');
  require('../models/menu-item.server.model.js');
  require('../models/role.server.model');
  require('../models/user.server.model');

  return db;
}

module.exports = mongooseConfig;