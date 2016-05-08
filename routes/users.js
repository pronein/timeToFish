var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.server.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', userController.create);

router.get('/current', userController.getCurrent);

module.exports = router;
