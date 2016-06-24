var express = require('express');
var router = express.Router();

var rolesController = require('../api/controllers/roles.server.controller');

module.exports = router;

/* Routes */

router.param('id', function(req, res, next, id) {
  req.roleParams = {
    id: id
  };

  next();
});

router.get('/', rolesController.get);
router.post('/', rolesController.create);

router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.delete);