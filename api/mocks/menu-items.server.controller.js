module.exports = {
  getAll: getAll,
  getByKey: getByKey
};

function getAll(req, res, next) {
  res.json({
    menuItems: [{
      key: 'the_key',
      name: 'a name to display',
      sequence: 10,
      description: 'some description',
      parent: null,
      state: 'menus.view',
      permissions: ['perm_1', 'perm_2', 'perm_3']
    }]
  });
}

function getByKey(req, res, next) {
  if (req.swagger.params.key.value === 'a_key')
    res.json({
      menuItems: [{
        key: 'a_key',
        name: 'some name here',
        sequence: 10,
        description: 'something described here',
        parent: null,
        state: 'menus.keyView',
        permissions: []
      }, {
        key: 'a_key',
        name: 'different name',
        sequence: 20,
        description: 'other description',
        parent: null,
        state: 'menus.keyView_2',
        permissions: ['perm_1']
      }]
    });
  else
    res.json({menuItems: []});
}