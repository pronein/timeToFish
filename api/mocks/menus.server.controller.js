module.exports = {
  getAll: getAll
};

function getAll(req, res, next) {
  res.json([{
    key: 'the_key',
    name: 'a name to display',
    sequence: 10,
    description: 'some description',
    parent: null,
    state: 'menus.view',
    permissions: ['perm_1', 'perm_2', 'perm_3']
  }]);
}