var mongoose = require('mongoose');
var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');

var log = require('../auxiliary/logger');

module.exports = {
  create: createRole,
  update: updateRole,
  delete: deleteRole,
  get: getRole
};

function createRole(req, res, next) {
  var role = new Role(req.body);

  if (req.body.permissions.length) {
    Permission
      .find({name: {$in: req.body.permissions}})
      .select({_id: 1})
      .exec(function (err, ids) {
        role.permissions = ids;
        role.save(function (err, newRole) {
          _onSaveComplete(res, err, newRole);
        });
      })
  } else
    role.save(function (err, newRole) {
      _onSaveComplete(res, err, newRole);
    });
}

function _onSaveComplete(res, err, role) {
  if (err) _handleError(res, err, 'Failed to create new role');
  else {
    role.populate({path: 'permissions', select: 'name'})
      .execPopulate()
      .then(function (populatedRole) {
        res.status(201).send(populatedRole);
      });
  }
}

function updateRole(req, res, next) {
  var updatedRole = new Role(req.body),
    query = {_id: mongoose.Types.ObjectId(req.roleParams.id)};

  //TODO: May need to load permissions to get ObjectIds

  Role.findOneAndUpdate(query, updatedRole, function (err, role) {
    if (err)_handleError(res, err, 'Failed to update role.');
    else {
      res.status(200).send(role);
    }
  });
}

function deleteRole(req, res, next) {
  var query = {_id: mongoose.Types.ObjectId(req.roleParams.id)};

  Role.remove(query, function (err) {
    if (err)_handleError(res, err, 'Failed to delete role.');
    else {
      res.sendStatus(204);
    }
  });
}

function getRole(req, res, next) {
  var query = req.query.name ? {name: req.query.name} : {};

  Role.find(query)
    .populate('permissions')
    .exec(function (err, roles) {
      if (err) _handleError(res, err, 'Failed to retrieve role.');
      else {
        res.status(200).send(roles);
      }
    });
}

function _handleError(res, err, customMessage) {
  log.error({err: err}, customMessage);

  res.status(500).json({msg: customMessage});
}