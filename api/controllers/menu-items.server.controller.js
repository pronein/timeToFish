var mongoose = require('mongoose');
var MenuItem = mongoose.model('MenuItem');
var log = require('../../auxiliary/logger');
var Promise = require('promise');
var utils = require('../../auxiliary/utils');

module.exports = {
  getAll: getAll,
  getById: getById,
  create: createMenuItem,
  deleteById: deleteMenuItemById,
  deleteByKey: deleteMenuItemByKey
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

function createMenuItem(req, res, next) {
  var menuItem = new MenuItem(req.body);

  menuItem.save(function (err) {
    if (err)
      _handleError(err, res, 'Failed to create a new menu item.');

    menuItem
      .populate('parent')
      .populate('permissions')
      .execPopulate()
      .then(function (populatedMenuItem) {
        res.status(201).json({menuItem: populatedMenuItem});
      })
      .catch(function (populationErr) {
        _handleError(populationErr, res, 'Failed to populate the new menu item.');
      });
  });
}

function deleteMenuItemById(req, res, next) {
  var id = req.swagger.params.id.value;

  //Get all children of item to delete (only first level, the deeper levels will maintain their hierarchy)
  MenuItem.find({parent: id}, function (err, children) {
    if (err)
      _handleError(err, res, 'Could not load the menu item children for parent update.');

    if (children && children.length) {
      //Children found, update their .parent to menuItemToBeDeleted.parent
      MenuItem.findOne({_id: id}, {parent: 1, _id: 0}, function (err, menuItemParent) {
        var childPromises = [];

        children.forEach(function (child) {
          childPromises.push(_getPromiseToUpdateParent(child, menuItemParent.parent));
        });

        //Try to update all children first
        Promise.all(childPromises)
          .then(function () {
            //All children successfully updated, try to delete the parent
            _getPromiseToDeleteMenuItem(id)
              .then(function () {
                res.sendStatus(204);
              })
              .catch(function (err) {
                _handleError(err, res, 'Failed to delete menu item after all children were updated.');
              });
          })
          .catch(function (err) {
            _handleError(err, res, 'Failed to update all children of menu item to be deleted.');
          });
      });
    } else {
      //No children, just delete the menu item
      _getPromiseToDeleteMenuItem(id)
        .then(function () {
          res.sendStatus(204);
        })
        .catch(function (err) {
          _handleError(err, res, 'Failed to delete menu item (with no children).');
        })
    }
  });
}

function deleteMenuItemByKey(req, res, next) {
  var key = utils.replaceWsWith(req.swagger.params.key.value);

  //delete all menu items with the given key (effectively deletes all children as well)
  MenuItem.find({key: key}).remove(function (err) {
    if (err)
      _handleError(err, res, 'Could not delete 1+ menu items with the given key: ' + key);

    res.sendStatus(204);
  });
}

function _getPromiseToDeleteMenuItem(menuItemId) {
  return new Promise(function (resolve, reject) {
    MenuItem.find({_id: menuItemId}).remove(function (err) {
      if (err) {
        log.error({err: err}, 'An error occured trying to delete menu item with id: ' + menuItemId);
        reject(err);
      } else
        resolve();
    });
  });
}

function _getPromiseToUpdateParent(child, parentId) {
  return new Promise(function (resolve, reject) {
    child.parent = parentId;
    child.save(function (err) {
      if (err) {
        log.error({err: err}, 'Failed to update child [' + child._id + '] with new parent id [' + parentId + '].');
        reject(err);
      } else
        resolve();
    });
  });
}

/*
 MenuItem.findOne({_id: req.swagger.params.id.value}, function (err, menuItemToDelete) {
 if (err)
 _handleError(err, res, 'Could not delete menu item.');

 if (!menuItemToDelete)
 res.sendStatus(204);

 var deleteChildren = req.swagger.params.deleteChildren.value,
 recursive = req.swagger.params.recursive.value;

 MenuItem.find({parent: menuItemToDelete._id}, function (err, children) {
 if (err)
 _handleError(err, res, 'Could not update children of menu item to delete, menu item not deleted.');

 if (children) {
 if (deleteChildren) {
 //delete first level of children
 children.forEach(function (child) {
 if (recursive) {
 //delete all levels of children
 _deleteAllChildrenOfParent(child._id);
 }

 child.remove(function (err) {
 if (err)
 log.error({err: err, parent: menuItemToDelete, child: child}, 'Could not delete child of parent.');
 });
 });
 } else {
 //move 1st level of children's parents to menuItemToDelete.parent
 children.forEach(function (child) {
 child.parent = menuItemToDelete.parent;
 child.save(function (err) {
 if (err)
 log.error({err: err, parent: menuItemToDelete, child: child}, 'Could not update child of menu item.');
 });

 if (recursive) {
 //move all levels of children's parents to menuItemToDelete.parent
 _updateAllChildrenWithParent(child, menuItemToDelete.parent);
 }
 });
 }
 }

 menuItemToDelete.remove(function (err) {
 if (err)
 _handleError(err, res, 'Failed to delete menu item.');

 res.sendStatus(204);
 });
 });
 });

 */
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
