(function (ng) {

  var inject = ['restBase'];

  function PermissionsService(restBase) {
    var service = this;

    service.getPermissions = _getAllPermissions;
    service.getCategories = _getAllCategories;
    service.insertNewPermission = _insertNewPermission;

    function _insertNewPermission(permission) {
      console.log('Attempting to insert a new permission...');
      return restBase.post(service.uris.insertPermission, permission);
    }

    function _getAllPermissions() {
      console.log('Getting all permissions...');
      return restBase.get(service.uris.getAllPermissions, true);
    }

    function _getAllCategories() {
      console.log('Getting all categories...');
      return restBase.get(service.uris.getAllCategories, true);
    }
  }

  PermissionsService.prototype.uris = {
    getAllPermissions: '/api/permissions',
    getAllCategories: '/api/permissions/categories',
    insertPermission: '/api/permissions'
  };

  PermissionsService.$inject = inject;

  ng.module('ttfPermissions')
    .service('permissionsService', PermissionsService);

})(window.angular);