var config = require('../config/config').crypto;
var crypto = require('crypto');

module.exports = {
  generateHash: _hashClearTextPassword,
  generateSalt: _generatePsuedoRandomSalt
};

function _hashClearTextPassword(password, salt) {
  var hash = crypto.pbkdf2Sync(password, salt, config.stretch, config.keyLen, config.digest);

  return hash.toString('hex');
}

function _generatePsuedoRandomSalt() {
  return crypto.randomBytes(config.saltLen).toString('hex');
}