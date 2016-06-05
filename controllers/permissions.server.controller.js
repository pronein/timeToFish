var log = require('../auxiliary/logger');
var Permission = require('mongoose').model('Permission');

module.exports = {
  getAllPermissions: _getAllPermissions,
  getAllCategories: _getAllCategories,
  createPermission: _createNewPermission
};

function _getAllPermissions(req, res, next) {
}

function _getAllCategories(req, res, next) {
}

function _createNewPermission(req, res, next) {
}
