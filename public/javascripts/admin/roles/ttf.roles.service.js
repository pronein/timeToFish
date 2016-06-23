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
      members: [],

      roles: []
    };

    service.loadRoleByName = loadRoleByName;
    service.indexOfByUsername = indexOfMemberByUsername;

    service.addNewRole = addNewRole;
    service.removeRole = removeRole;
    service.updateRole = updateRole;

    service.resetRoleData = resetData;

    _activate();

    function _activate() {
      _refreshServiceData();
    }

    function _refreshServiceData() {
      resetData();
      _loadRoles();
    }

    function resetData() {
      service.data.id = '';
      service.data.name = '';
      service.data.description = '';
      service.data.isDefault = false;
      service.data.permissions.splice(0);
      service.data.members.splice(0);
    }

    function _loadRoles() {
      return restBase.get(service.uris.getRoles, true)
        .then(function (roles) {
          service.data.roles = roles;
          membersService.refresh();
        })
    }

    function loadRoleByName(roleName) {
      resetData();

      return restBase.get(
        service.uris.getRoleByName, {
          name: roleName
        }, true)
        .then(function (roles) {
          var role = roles[0];

          service.data.id = role.id;
          service.data.name = role.name;
          service.data.description = role.description;
          service.data.isDefault = role.isDefault;

          service.data.permissions = role.permissions.map(function (permission) {
            return permission.name;
          });

          membersService.data.members.forEach(
            function (member) {
              if (membersService.userHasRole(member.username, role.name)) {
                service.data.members.push(member);
              }
            });

          console.log('Members for role [' + role.name + ']: ' + JSON.stringify(service.data.members));
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
          //usersService.removeRoleFromAllUsers(service.data.id);

          _refreshServiceData();
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
      //usersService.addRoleToUsers(service.data.members.map(_selectUsernames), role);

      _refreshServiceData();

      return role;
    }

    function _getRoleApiPayload() {
      return {
        name: service.data.name,
        description: service.data.description,
        isDefault: service.data.isDefault,
        permissions: service.data.permissions,
        members: service.data.members
      };
    }
  }

  RolesService.prototype.uris = {
    /*POST*/    createNewRole: '/api/roles',
    /*DELETE*/  deleteRole: '/api/roles/:id',
    /*PUT*/     updateExistingRole: '/api/roles/:id',
    /*GET*/     getRoleByName: '/api/roles',
    /*GET*/     getRoles: '/api/roles'
  };

  RolesService.prototype.events = {
    AddNewRoleEvent: 'add_new_role_event',
    EditRoleEvent: 'edit_role_event'
  };

  RolesService.$inject = inject;

  ng.module('ttfRoles')
    .service('rolesService', RolesService);

})(window.angular);