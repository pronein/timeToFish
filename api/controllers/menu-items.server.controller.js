var mongoose = require('mongoose');
var MenuItem = mongoose.model('MenuItem');
var log = require('../../auxiliary/logger');

module.exports = {
  getAll: getAll,
  getById: getById
};

function getAll(req, res, next) {
  var criteria = {};
  if (req.swagger.params.key.value)
    criteria.key = req.swagger.params.key.value;

  MenuItem.find(criteria)
    .populate('permissions')
    .populate('parent')
    .exec(function (err, menuItems) {
      if (err)
        _handleError(err, res, 'Failed to retrieve menu items.');

      _doMenuItemSort(menuItems);

      res.json(menuItems);
    });
}

function getById(req, res, next) {
  MenuItem.findOne({_id: req.swagger.params.id.value})
    .populate('permissions')
    .populate('parent')
    .exec(function (err, menuItem) {
      if (err)
        _handleError(err, res, 'Failed to retrieve menu items by id.');

      res.json({menuItem: menuItem});
    });
}

function _handleError(err, res, msg) {
  log.error({err: err}, msg);

  res.status(500).json({msg: msg});
}

function _doMenuItemSort(menuItems) {
  menuItems.sort(function (left, right) {

    //check keys for equality
    if (left.key !== right.key)
      return left.key.localeCompare(right.key);

    //keys are equal, check parents
    if (!left.parent && right.parent)
      return -1;
    else if (!right.parent && left.parent)
      return 1;
    else if (!left.parent && right.parent)
      return 0;

    //parents are equal, do alphabetical names
    return left.name.localeCompare(right.name);
  });
}