var mongoose = require('mongoose');
var MenuItem = mongoose.model('MenuItem');
var log = require('../../auxiliary/logger');

module.exports = {
  getAll: getAll,
  getByKey: getByKey
};

function getAll(req, res, next) {
  MenuItem.find({})
    .populate('permissions')
    .populate('parent')
    .exec(function (err, menuItems) {
      if (err)
        _handleError(err, res, 'Failed to retrieve menu items.');

      _doMenuItemSort(menuItems);

      res.json(menuItems);
    });
}

function getByKey(req, res, next) {
  MenuItem.find({key: req.swagger.params.key.value})
    .populate('permissions')
    .populate('parent')
    .exec(function(err, menuItems) {
      if(err)
        _handleError(err, res, 'Failed to retrieve menu items by key.');

      _doMenuItemSort(menuItems);

      res.json(menuItems);
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