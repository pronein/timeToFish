var express = require('express');
var router = express.Router();

var authController = require('../api/controllers/auth.server.controller');

module.exports = router;

/* Routes */

router.post('/', authController.authenticateUser);

router.post('/release', authController.disavowUser);
