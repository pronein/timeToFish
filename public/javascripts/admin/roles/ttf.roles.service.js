(function (ng) {

  var inject = ['restBase'];

  function RolesService(restBase) {
    var service = this;
    
    service.data = {
      name: '',
      isDefault: false,
      permissions: [],
      members: []
    };

    service.loadRoleByName = loadRoleByName;

    function loadRoleByName(roleName) {
      //TODO: Implement me
    }
  }
  
  RolesService.prototype.uris = {
    
  };

  RolesService.$inject = inject;

  ng.module('ttfRoles')
    .service('rolesService', RolesService);

})(window.angular);