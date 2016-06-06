(function (ng) {

  var inject = ['permissionsService'];

  function permissionsController(permissionsService) {
    var ctrl = this,
      _values = {
        permissions: [],
        categories: []
      };

    ctrl.show = {
      removeSuccess: false,
      insertSuccess: false
    };
    
    ctrl.newPermission = {
      name: '',
      description: '',
      category: ''
    };

    ctrl.getPermissions = _getPermissions;
    ctrl.getCategories = _getCategories;
    ctrl.removePermission = _removePermission;
    ctrl.removeCategory = _removeCategory;
    ctrl.refresh = _refresh;
    ctrl.addNewPermission = _addNewPermission;
    ctrl.toggleCategory = _toggleCategory;

    _init();

    function _init() {
      _refresh();
    }

    function _refresh() {
      _values.permissions = permissionsService.getPermissions();
      permissionsService.getCategories()
        .then(function(categories) {
          _values.categories = categories;
          console.log('categories: ' + _values.categories);
        })
        .catch(function(err) {
          console.log('failed to retrieve categories: ' + err.status + ' ' + err.statusText);
        })
    }

    function _toggleCategory(event) {
      ng.element(event.target).toggleClass('badge-primary');
    }
    
    function _addNewPermission() {
      permissionsService.insertNewPermission(ctrl.newPermission)
        .then(function() {
          ctrl.newPermission.name = '';
          ctrl.newPermission.description = '';
          ctrl.newPermission.category = '';

          _refresh();

          ng.element('#name').focus();
        });
    }
    
    function _getPermissions() {
      return _values.permissions;
    }

    function _getCategories() {
      return _values.categories;
    }

    function _removeCategory(categoryId) {
      alert('removing category id #' + categoryId + '...');
    }

    function _removePermission(permissionId) {
      alert('removing permission id #' + permissionId + '...');
    }
  }

  permissionsController.$inject = inject;

  ng.module('ttfPermissions')
    .controller('PermissionsController', permissionsController);

})(window.angular);