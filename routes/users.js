var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.server.controller');
var menuItemController = require('../controllers/menu-item.server.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', userController.create);

router.get('/current/menu', menuItemController.getMenu);

module.exports = router;
