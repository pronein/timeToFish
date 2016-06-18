(function (ng) {

  var inject = [];

  function rolesPermissionsSelectorDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'javascripts/admin/roles/views/partial-roles-permissions-selector.html',
      controller: 'RolesPermissionsSelectorController',
      controllerAs: 'ctrl'
    }
  }

  rolesPermissionsSelectorDirective.$inject = inject;

  ng.module('ttfRoles')
    .directive('ttfRolesPermissionsSelector', rolesPermissionsSelectorDirective);

})(window.angular);