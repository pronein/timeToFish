(function (ng) {

  var inject = ['restBase', 'membersService'];

  function RolesService(restBase, membersService) {
    var service = this;

    service.data = {
      id: '', //ObjectId: used for removal & updating
      name: '',
      description: '',
      isDefault: false,
      permissions: [],
      members: []
    };

    service.loadRoleByName = loadRoleByName;
    service.indexOfByUsername = indexOfMemberByUsername;

    service.addNewRole = addNewRole;
    service.removeRole = removeRole;
    service.updateRole = updateRole;

    _activate();

    function _activate() {
      _resetData();
    }

    function _resetData() {
      service.data.id = '';
      service.data.name = '';
      service.data.description = '';
      service.data.isDefault = false;
      service.data.permissions = [];
      service.data.members = [];
    }

    function loadRoleByName(roleName) {
      _resetData();

      return restBase.get(
        service.uris.getRoleByName, {
          name: roleName
        }, true)
        .then(function (role) {
          service.data.id = role.id;
          service.data.name = role.name;
          service.data.description = role.description;
          service.data.isDefault = role.isDefault;

          service.data.permissions = role.permissions.map(function (permission) {
            return permission.name;
          });

          service.data.members = membersService.data.members.filter(
            function (member) {
              return membersService.userHasRole(member.username, role.name)
            });
        });
    }

    function indexOfMemberByUsername(username) {
      if (!username || typeof username !== 'string') return -1;

      return service.data.members.findIndex(function (member) {
        return member.username.toLowerCase() === username.toLowerCase();
      });
    }

    function addNewRole() {
      return restBase.post(
        service.uris.createNewRole,
        _getRoleApiPayload(), true)
        .then(_handleNewOrUpdatedRole);
    }

    function removeRole() {
      return restBase.delete(service.uris.deleteRole, {
        id: service.data.id
      })
        .then(function () {
          usersService.removeRoleFromAllUsers(service.data.id);

          _resetData();
        });
    }

    function updateRole() {
      return restBase.put(
        service.uris.updateExistingRole,
        _getRoleApiPayload(), {
          id: service.data.id
        }, true)
        .then(_handleNewOrUpdatedRole);
    }

    function _selectUsernames(member) {
      return member.username;
    }

    function _handleNewOrUpdatedRole(role) {
      usersService.addRoleToUsers(service.data.members.map(_selectUsernames), role);

      _resetData();

      return role;
    }

    function _getRoleApiPayload() {
      return {
        name: service.data.name,
        description: service.data.description,
        isDefault: service.data.isDefault,
        permissions: service.data.permissions
      };
    }
  }

  RolesService.prototype.uris = {
    /*POST*/    createNewRole: '/api/roles',
    /*DELETE*/  deleteRole: '/api/roles/:id',
    /*PUT*/     updateExistingRole: '/api/roles/:id',
    /*GET*/     getRoleByName: '/api/roles'
  };

  RolesService.$inject = inject;

  ng.module('ttfRoles')
    .service('rolesService', RolesService);

})(window.angular);