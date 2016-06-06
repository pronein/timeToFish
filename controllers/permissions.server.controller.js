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
  Permission.find().distinct('category', function(err, categories) {
    if(err) {
      log.error({err: err}, 'Error during retrieval of categories.');

      res.status(500).json({msg: 'Failed to retrieve categories.'});
    } else 
      res.send(categories);
  });
}

function _createNewPermission(req, res, next) {
  var permission = new Permission(req.body);

  permission.save(function (err) {
    if (err) {
      log.error({err: err}, 'Error during creation of permission.');

      res.status(500).json({msg: 'Failed to create new permission.'});
    } else
      return res.status(201).send(permission);
  });
}
