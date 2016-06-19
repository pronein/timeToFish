(function (ng) {

  var inject = [];

  function permissionsSelectorDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'javascripts/admin/permissions/views/partial-permissions-selector.html',
      controller: 'PermissionsSelectorController',
      controllerAs: 'ctrl'
    }
  }

  permissionsSelectorDirective.$inject = inject;

  ng.module('ttfPermissions')
    .directive('ttfPermissionsSelector', permissionsSelectorDirective);

})(window.angular);