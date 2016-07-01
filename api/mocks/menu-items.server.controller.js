module.exports = {
  getAll: getAll,
  getById: getById,
  create: createMenuItem,
  deleteById: deleteMenuItemById,
  deleteByKey: deleteMenuItemByKey
};

var _internalCollection = [
  {
    id: '5753bfabe9279fe82a226725',
    key: 'a_key',
    name: 'some name here',
    sequence: 10,
    description: 'something described here',
    parent: null,
    state: 'menus.keyView',
    permissions: []
  }, {
    id: '5753bfabe9279fe82a226726',
    key: 'b_key',
    name: 'different name',
    sequence: 20,
    description: 'other description',
    parent: null,
    state: 'menus.keyView_2',
    permissions: ['perm_1']
  }, {
    id: '5753bfabe9279fe82a226727',
    key: 'b_key',
    name: 'a name to display',
    sequence: 10,
    description: 'some description',
    parent: {
      id: '5753bfabe9279fe82a226726',
      key: 'b_key',
      name: 'different name',
      sequence: 20,
      description: 'other description',
      parent: null,
      state: 'menus.keyView_2',
      permissions: ['perm_1']
    },
    state: 'menus.view',
    permissions: ['perm_2', 'perm_3']
  }
];

function getAll(req, res, next) {
  if(req.swagger.params.key.value)
    res.json({menuItems: _internalCollection.filter(function(mItem){
      return mItem.key === req.swagger.params.key.value;
    })});
  else
    res.json({menuItems: _internalCollection});
}

function getById(req, res, next) {
  res.json({
    menuItem: _internalCollection.filter(function(mItem){
      return mItem.id === req.swagger.params.id.value;
    })
  });
}

function createMenuItem(req, res, next) {
  var parent = _internalCollection.filter(function(mItem){
    return mItem.id === req.body.parent;
  });

  if (parent.length)
    parent = parent[0];
  else
    parent = null;

  res.json({
    menuItem: {
      id: '5753bfabe9279fe82a226724',
      key: req.body.key,
      name: req.body.name,
      sequence: req.body.sequence,
      description: req.body.description,
      parent: parent,
      state: req.body.state,
      permissions: req.body.permissions || []
    }
  });
}

function deleteMenuItemById(req, res, next) {
  var item = _internalCollection.filter(function(mItem){
    return mItem.id === req.swagger.params.id.value;
  });

  res.sendStatus(204);
}

function deleteMenuItemByKey(req, res, next) {
  var item = _internalCollection.filter(function(mItem){
    return mItem.key === req.swagger.params.key.value;
  });

  res.sendStatus(204);
}