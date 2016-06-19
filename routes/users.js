var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.server.controller');
var menuItemController = require('../controllers/menu-item.server.controller');

module.exports = router;

/* Routes */

router.get('/', userController.getAllUsers);
router.post('/', userController.create);

router.get('/current/menu', menuItemController.getMenu);

router.post('/usernameExists', userController.validateUsername);
