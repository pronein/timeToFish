(function (ng) {

  var inject = [];

  function ttfRolesSelectorDirective() {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'javascripts/admin/roles/views/partial-roles-selector.html',
      controller: 'RolesSelectorController',
      controllerAs: 'ctrl'
    };
  }

  ttfRolesSelectorDirective.$inject = inject;

  ng.module('ttfRoles')
    .directive('ttfRolesSelector', ttfRolesSelectorDirective);

})(window.angular);