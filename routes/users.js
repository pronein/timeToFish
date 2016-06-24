var express = require('express');
var router = express.Router();

var userController = require('../api/controllers/user.server.controller');
var menuItemController = require('../api/controllers/menu-item.server.controller');

module.exports = router;

/* Routes */

router.get('/', userController.getAllUsers);
router.post('/', userController.create);

router.get('/current/menu', menuItemController.getMenu);

router.post('/usernameExists', userController.validateUsername);
