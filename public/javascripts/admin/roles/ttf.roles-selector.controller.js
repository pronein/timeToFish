(function (ng) {

  var inject = ['rolesService', '$rootScope'];

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

    }
    
    function addNewRole() {
      ctrl.vm.activeRoleName = ctrl.constants.NewRole;
      $rootScope.$emit(rolesService.events.AddNewRoleEvent)
    }
    
    function editRole(role) {
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