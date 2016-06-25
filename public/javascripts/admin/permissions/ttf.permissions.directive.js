(function (ng) {

  var inject = [];

  function permissionsDirective() {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      controller: 'PermissionsController',
      controllerAs: 'ctrl',
      templateUrl: 'javascripts/admin/permissions/views/permissions.html',
      css: 'stylesheets/permissions.css'
    }
  }

  permissionsDirective.$inject = inject;

  ng.module('ttfPermissions')
    .directive('permissions', permissionsDirective);

})(window.angular);