module.exports = {
  getAll: getAll,
  getById: getById
};

function getAll(req, res, next) {
  var menuItems = [{
    key: 'a_key',
    name: 'some name here',
    sequence: 10,
    description: 'something described here',
    parent: null,
    state: 'menus.keyView',
    permissions: []
  }, {
    key: 'b_key',
    name: 'different name',
    sequence: 20,
    description: 'other description',
    parent: null,
    state: 'menus.keyView_2',
    permissions: ['perm_1']
  }];

  if(req.swagger.params.key.value)
    res.json({menuItems: menuItems.filter(function(mItem){
      return mItem.key === req.swagger.params.key.value;
    })});
  else
    res.json({menuItems: menuItems});
}

function getById(req, res, next) {
  res.json({
    menuItem: {
      id: req.swagger.params.id.value,
      key: 'the_key',
      name: 'a name to display',
      sequence: 10,
      description: 'some description',
      parent: null,
      state: 'menus.view',
      permissions: ['perm_1', 'perm_2', 'perm_3']
    }
  });
}