var express = require('express');
var router = express.Router();

var menusController = require('../api/controllers/menus.server.controller');

module.exports = router;

router.get('/', menusController.getAll);