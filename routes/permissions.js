var express = require('express');
var router = express.Router();

var permissionsController = require('../controllers/permissions.server.controller');

module.exports = router;

/* Routes */

router.get('/', permissionsController.getAllPermissions);
router.post('/', permissionsController.createPermission);

router.get('/categories', permissionsController.getAllCategories);
