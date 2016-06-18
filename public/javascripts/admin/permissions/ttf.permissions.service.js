(function (ng) {

  var inject = ['restBase'];

  function PermissionsService(restBase) {
    var service = this;

    service.data = {
      categories: [],
      permissions: []
    };

    service.loadPermissions = loadPermissionsFilteredByCategories;
    service.loadCategories = loadCategories;
    service.addPermission = addNewPermission;
    service.removePermission = removePermission;

    var _filter = [null];

    _initializeService();

    function _initializeService() {
      console.info('service-init');

      _refresh();
    }

    function _refresh() {
      loadCategories();
      loadPermissionsFilteredByCategories();
    }

    function loadPermissionsFilteredByCategories(categoryFilter) {
      //Sanitize categoryFilter
      categoryFilter = categoryFilter || _filter;
      categoryFilter = categoryFilter.length ? categoryFilter : [null];
      _filter = categoryFilter;

      return restBase.get(service.uris.getFilteredPermissions, {categories: _filter}, true)
        .then(function (permissions) {
          service.data.permissions = permissions;
        })
        .catch(_handleError);
    }

    function loadCategories() {
      //Loads all categories
      restBase.get(service.uris.getAllCategories, true)
        .then(function (categories) {
          service.data.categories = categories;
        })
        .catch(_handleError);
    }

    function _handleError(err) {
      console.error('An error has occurred: ' + ng.toJson(err));

      return err;
    }

    function addNewPermission(newPermission) {
      return restBase.post(service.uris.insertNewPermission, newPermission)
        .then(function (permission) {
          _refresh();

          return permission;
        });
    }

    function removePermission(permissionName) {
      return restBase.delete(service.uris.removePermissionByName, {name: permissionName})
        .then(function () {
          _refresh();
        });
    }
  }

  PermissionsService.prototype.uris = {
    /*GET*/ getAllCategories: '/api/permissions/categories',
    /*POST*/ insertNewPermission: '/api/permissions',
    /*DELETE*/ removePermissionByName: '/api/permissions/:name',
    /*GET*/ getFilteredPermissions: '/api/permissions'
  };

  PermissionsService.$inject = inject;

  ng.module('ttfPermissions')
    .service('permissionsService', PermissionsService);

})(window.angular);