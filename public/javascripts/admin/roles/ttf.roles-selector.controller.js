(function (ng) {

  var inject = ['rolesService', '$rootScope'];

  //TODO: Add/remove roles (on new/update) based on checked members
  //TODO: Add default roles to new registered members
  //TODO: Remove roles via Selected Role [Remove] button

  //Other
  //TODO: Add menu items (associate permissions with menu items)
  //TODO: Allow menu items to nest (based on particular view/state
  //TODO: Add photo update to user registration
  //TODO: Add all these todos to youtrack site
  //TODO: Rebuild memu directive/service/controller
  //TODO: Refactor root level angular into /core, /etc...
  //TODO: Finish checklists (prepare story)

  function RolesSelectorController(rolesService, $rootScope) {
    var ctrl = this;

    ctrl.vm = {
      rolesData: rolesService.data,
      activeRoleName: ''
    };

    ctrl.addNewRole = addNewRole;
    ctrl.editRole = editRole;
    ctrl.isActiveRole = isActiveRole;
    
    _activate();

    function _activate() {
      rolesService.resetRoleData();
    }
    
    function addNewRole() {
      rolesService.resetRoleData();
      ctrl.vm.activeRoleName = ctrl.constants.NewRole;
      $rootScope.$emit(rolesService.events.AddNewRoleEvent)
    }
    
    function editRole(role) {
      rolesService.resetRoleData();
      ctrl.vm.activeRoleName = role.name;
      $rootScope.$emit(rolesService.events.EditRoleEvent, role);
    }

    function isActiveRole(roleName) {
      return ctrl.vm.activeRoleName === roleName;
    }
  }

  RolesSelectorController.prototype.constants = {
    NewRole: '__AddNewRole__'
  };

  RolesSelectorController.$inject = inject;

  ng.module('ttfRoles')
    .controller('RolesSelectorController', RolesSelectorController);

})(window.angular);