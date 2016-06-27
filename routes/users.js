var express = require('express');
var router = express.Router();

var userController = require('../api/controllers/user.server.controller');

module.exports = router;

/* Routes */

router.get('/', userController.getAllUsers);
router.post('/', userController.create);

router.post('/usernameExists', userController.validateUsername);
