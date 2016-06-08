(function (ng) {

  var inject = [];

  function rolesDirective() {
    return {
      restrict: 'E',
      controller: 'RolesController',
      controllerAs: 'ctrl',
      templateUrl: 'javascripts/admin/roles/views/roles.html'
    }
  }

  rolesDirective.$inject = inject;

  ng.module('ttfRoles')
    .directive('roles', rolesDirective);

})(window.angular);