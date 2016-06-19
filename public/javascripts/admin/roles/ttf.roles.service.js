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
    service.indexOfByUsername = indexOfByUsername;

    function loadRoleByName(roleName) {
      //TODO: Implement me
    }

    function indexOfByUsername(username) {
      if (!username || typeof username !== 'string') return -1;

      return service.data.members.findIndex(function (member) {
        return member.username.toLowerCase() === username.toLowerCase();
      });
    }
  }

  RolesService.prototype.uris = {
    
  };

  RolesService.$inject = inject;

  ng.module('ttfRoles')
    .service('rolesService', RolesService);

})(window.angular);