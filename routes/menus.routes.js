var express = require('express');
var router = express.Router();

var menusController = require('../api/controllers/menu-items.server.controller.js');

module.exports = router;

router.get('/', menusController.getAll);