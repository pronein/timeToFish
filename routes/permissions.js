var express = require('express');
var router = express.Router();

var permissionsController = require('../controllers/permissions.server.controller');

module.exports = router;

/* Routes */

router.param('name', function(req, res, next, name) {
  req.permissionParams = {
    name: name
  };
  
  next();
});

router.get('/', permissionsController.getAllPermissions);
router.get('/', permissionsController.getPermissionsByCategoryFilter);
router.post('/', permissionsController.createPermission);

router.get('/categories', permissionsController.getAllCategories);

router.delete('/:name', permissionsController.deletePermission);