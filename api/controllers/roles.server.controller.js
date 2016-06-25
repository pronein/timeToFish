var mongoose = require('mongoose');
var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var User = mongoose.model('User');

var log = require('../../auxiliary/logger');

module.exports = {
  create: createRole,
  update: updateRole,
  delete: deleteRole,
  get: getRole
};

function createRole(req, res, next) {
  var role = new Role(req.body),
    permissionNames = req.body.permissions,
    members = req.body.members;

  if (permissionNames && permissionNames.length) {
    _setRolePermissions(permissionNames, members, role, res, 201);
  } else
    _saveRole(role, res, members, 201);
}

function _setRolePermissions(permissionNames, members, role, res, resHttpCode) {
  Permission
    .find({name: {$in: permissionNames}})
    .select({_id: 1})
    .exec(function (err, ids) {
      if (err) {
        _handleError(res, err, 'Failed to set role permissions.');
      } else {
        role.permissions = ids;

        _saveRole(role, res, members, resHttpCode);
      }
    });
}

function _saveRole(role, res, members, resHttpCode) {
  role.save(function (err, newRole) {
    _onSaveComplete(res, err, newRole, members, resHttpCode);
  })
}

function _onSaveComplete(res, err, role, members, resHttpCode) {
  if (err) {
    _handleError(res, err, 'Failed to ' + (resHttpCode === 201 ? 'create' : 'update') + ' role');
  } else {
    _updateMemberRoles(members, role, res, resHttpCode)
  }
}

function _updateMemberRoles(members, role, res, resHttpCode) {
  if (members && members.length) {
    User.removeRoleFromAll(role, function (removalErr) {
      if (removalErr) {
        _handleError(res, removalErr, 'Failed to remove role from users.');
      } else {
        User.addRoleToMembers(role, members, function (addErr) {
          if (addErr) {
            _handleError(res, addErr, 'Failed to add role to users.');
          } else {
            _populateRoleAndSendResponse(role, res, resHttpCode);
          }
        });
      }
    });
  } else {
    _populateRoleAndSendResponse(role, res, resHttpCode);
  }
}

function _populateRoleAndSendResponse(role, res, resHttpCode) {
  role
    .populate({path: 'permissions', select: 'name'})
    .execPopulate()
    .then(function (populatedRole) {
      res.status(resHttpCode).send(populatedRole);
    })
    .catch(function (err) {
      _handleError(res, err, 'Failed to populate role.');
    })
}

function updateRole(req, res, next) {
  var query = {_id: req.roleParams.id},
    permissionNames = req.body.permissions,
    members = req.body.members;

  Role.findOne(query, function (err, role) {
    if (err)
      _handleError(res, err, 'Failed to update role.');
    else {
      role.name = req.body.name;
      role.isDefault = req.body.isDefault;
      role.description = req.body.description;

      if (permissionNames && permissionNames.length) {
        _setRolePermissions(permissionNames, members, role, res, 200);
      } else {
        role.permissions = [];

        _saveRole(role, res, members, 200);
      }
    }
  });
}

function deleteRole(req, res, next) {
  var query = {_id: req.roleParams.id};

  Role.findOne(query, function (err, role) {
    if (err)
      _handleError(res, err, 'Failed to retrieve role.');
    else {
      User.removeRoleFromAll(role, function (removalErr) {
        if (removalErr)
          _handleError(res, removalErr, 'Failed to remove role from all users.');
        else {
          Role.remove(query, function (deletionErr) {
            if (deletionErr)
              _handleError(res, deletionErr, 'Failed to delete role.');
            else
              res.sendStatus(204);
          });
        }
      })
    }
  });
}

function getRole(req, res, next) {
  var query = req.query.name ? {name: req.query.name} : {};

  Role.find(query)
    .populate('permissions')
    .exec(function (err, roles) {
      if (err)
        _handleError(res, err, 'Failed to retrieve role.');
      else {
        res.status(200).send(roles);
      }
    });
}

function _handleError(res, err, customMessage) {
  log.error({err: err}, customMessage);

  res.status(500).json({msg: customMessage});
}