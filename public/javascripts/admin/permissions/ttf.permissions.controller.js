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

    function _refresh(selectedCategories) {
      permissionsService.getCategories()
        .then(function (categories) {
          _values.categories = categories.map(function (cat) {
            var isSelected = !selectedCategories || (selectedCategories.indexOf(cat) > -1 && true);
            return {
              name: cat,
              selected: isSelected
            };
          });
          console.log('categories: ' + _values.categories);

          var filteredCategories = _values.categories
            .filter(function (cat) {
              return cat.selected;
            }).map(function (cat) {
              return cat.name;
            });

          if(!filteredCategories.length) filteredCategories.push(null);

          permissionsService.getPermissionsByCategoryFilter(filteredCategories)
            .then(function (permissions) {
              _values.permissions = permissions;
              console.log('permissions: ' + _values.permissions);
            })
            .catch(function (err) {
              console.log('failed to retrieve permissions: ' + err.status + ' ' + err.statusText);
            });
        })
        .catch(function (err) {
          console.log('failed to retrieve categories: ' + err.status + ' ' + err.statusText);
        })
    }

    function _toggleCategory(event) {
      ng.element(event.target).toggleClass('badge-primary');

      if(event.target.innerHTML === 'all')
        ng.element('.badge').addClass('badge-primary');
      
      _filterPermissionsByCategories();
    }

    function _filterPermissionsByCategories() {
      var selectedCategories = ng.element('.badge.badge-primary');
      selectedCategories = selectedCategories
        .toArray()
        .map(function (elem) {
          return elem.innerHTML;
        });

      _refresh(selectedCategories);
    }

    function _addNewPermission() {
      permissionsService.insertNewPermission(ctrl.newPermission)
        .then(function () {
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

    function _removePermission(permission) {
      permissionsService.removePermission(permission.name)
        .then(function () {
          _refresh();
        });
    }
  }

  permissionsController.$inject = inject;

  ng.module('ttfPermissions')
    .controller('PermissionsController', permissionsController);

})(window.angular);