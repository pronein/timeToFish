(function (ng) {

  var inject = ['permissionsService', 'rolesService', '$stateParams'];

  function RolesController(permissionsService, rolesService, $stateParams) {
    var ctrl = this;

    ctrl.vm = {
      permData: permissionsService.data,
      roleData: rolesService.data
    };

    _activate();

    function _activate() {
      console.log('Activating RolesController...');
      if ($stateParams.roleName) {
        rolesService.loadRoleByName($stateParams.roleName);
      }
    }
  }

  RolesController.$inject = inject;

  ng.module('ttfRoles')
    .controller('RolesController', RolesController);

})(window.angular);