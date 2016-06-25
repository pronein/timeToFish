(function (ng) {

  var inject = [];

  function rolesDirective() {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      controller: 'RolesController',
      controllerAs: 'ctrl',
      templateUrl: 'javascripts/admin/roles/views/roles.html',
      css: 'stylesheets/roles.css'
    }
  }

  rolesDirective.$inject = inject;

  ng.module('ttfRoles')
    .directive('roles', rolesDirective);

})(window.angular);