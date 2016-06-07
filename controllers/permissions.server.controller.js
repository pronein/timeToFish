var log = require('../auxiliary/logger');
var Permission = require('mongoose').model('Permission');

module.exports = {
  getAllPermissions: _getAllPermissions,
  getPermissionsByCategoryFilter: _getPermissionsByCategoryFilter,
  getAllCategories: _getAllCategories,
  createPermission: _createNewPermission,
  deletePermission: _deletePermission
};

function _getAllPermissions(req, res, next) {
  if(req.query.categories) return next();

  Permission.find({}, function(err, permissions) {
    if(err) {
      log.error({err: err}, 'Error during retrieval of permissions.');
      return res.status(500).json({msg: 'Failed to retrieve permissions.'});
    }
    
    res.send(permissions);
  });
}

function _getPermissionsByCategoryFilter(req, res, next) {
  Permission.find({category: {$in: req.query.categories}}, function(err, permissions) {
    if(err) {
      log.error({err: err}, 'Error during retrieval of permissions.');
      return res.status(500).json({msg: 'Failed to retrieve permissions.'});
    }

    res.send(permissions);
  });
}

function _getAllCategories(req, res, next) {
  Permission.find().distinct('category', function(err, categories) {
    if(err) {
      log.error({err: err}, 'Error during retrieval of categories.');

      return res.status(500).json({msg: 'Failed to retrieve categories.'});
    }
    
    res.send(categories);
  });
}

function _createNewPermission(req, res, next) {
  var permission = new Permission(req.body);

  permission.save(function (err) {
    if (err) {
      log.error({err: err}, 'Error during creation of permission.');

      return res.status(500).json({msg: 'Failed to create new permission.'});
    }
    
    return res.status(201).send(permission);
  });
}

function _deletePermission(req, res, next) {
  Permission.remove({name: req.permissionParams.name}, function(err) {
    if(err) {
      log.error({err: err}, 'Error during removal of permission.');
      return res.status(500).json({msg: 'Failed to remove permission.'});
    }
    
    return res.sendStatus(204);
  });
}
