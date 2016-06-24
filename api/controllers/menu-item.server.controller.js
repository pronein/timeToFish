var mongoose = require('mongoose');

var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var MenuItem = mongoose.model('MenuItem');

var log = require('../../auxiliary/logger');

module.exports = {
  getMenu: getUserMenu
};

function getUserMenu(req, res, next) {
  var user = req.user;
  var ownerState = req.query['ownerState'];

  if (!user) {
    return res.sendStatus(204);
  }

  Role.populate(user, 'roles', function (err, user) {
    if (err) {
      log.error({err: err}, 'Error loading roles for session user.');
      return res.sendStatus(204);
    }

    Permission.populate(user.roles, 'permissions', function (err, roles) {
      if (err) {
        log.error({err: err}, 'Error loading permissions for session user\'s roles.');
        return res.sendStatus(204);
      }

      var userPermissions = [];
      roles.forEach(function (role) {
        role.permissions.forEach(function (permission) {
          if (!userPermissions.find(function (userPermission) {
              return permission._id === userPermission._id;
            })) {
            userPermissions.push(permission._id);
          }
        });
      });

      MenuItem.find({
        'permissionRequired': {
          $in: userPermissions
        },
        owner: ownerState
      }, function (err, menuItems) {
        if (err) {
          log.error({err: err}, 'Error loading menu items for session user.');
          return res.sendStatus(204);
        }

        res.status(200).send(menuItems);
      });
    });
  });
}