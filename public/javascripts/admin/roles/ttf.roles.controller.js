(function (ng) {

  var inject = ['permissionsService', 'rolesService'];

  function RolesController(permissionsService, rolesService) {
    var ctrl = this;
    
    ctrl.vm = {
      
    };
  }

  RolesController.$inject = inject;

  ng.module('ttfRoles')
    .controller('RolesController', RolesController);

})(window.angular);