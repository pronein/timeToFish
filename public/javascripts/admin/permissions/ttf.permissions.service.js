(function (ng) {

  var inject = ['restBase'];

  function PermissionsService(restBase) {
    var service = this;

    service.getPermissions = _getAllPermissions;
    service.getCategories = _getAllCategories;
    service.insertNewPermission = _insertNewPermission;
    service.removePermission = _removePermission;
    service.getPermissionsByCategoryFilter = _getPermissionsByCategoryFilter;

    function _insertNewPermission(permission) {
      console.log('Attempting to insert a new permission...');
      return restBase.post(service.uris.insertPermission, permission);
    }

    function _getAllPermissions() {
      console.log('Getting all permissions...');
      return restBase.get(service.uris.getAllPermissions, true);
    }

    function _getPermissionsByCategoryFilter(filteredCategories) {
      console.log('Getting all permissions with categories ' + filteredCategories + '...');
      return restBase.get(service.uris.getFilteredPermissions, {categories: filteredCategories}, true);
    }
    
    function _getAllCategories() {
      console.log('Getting all categories...');
      return restBase.get(service.uris.getAllCategories, true);
    }

    function _removePermission(permissionName) {
      console.log('Removing permission (' + permissionName + ')...');
      return restBase.delete(service.uris.removePermissionByName, {name: permissionName});
    }
  }

  PermissionsService.prototype.uris = {
    getAllPermissions: '/api/permissions',
    getAllCategories: '/api/permissions/categories',
    insertPermission: '/api/permissions',
    removePermissionByName: '/api/permissions/:name',
    getFilteredPermissions: '/api/permissions'
  };

  PermissionsService.$inject = inject;

  ng.module('ttfPermissions')
    .service('permissionsService', PermissionsService);

})(window.angular);