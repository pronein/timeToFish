(function (ng) {

  var inject = [];

  function permissionsDirective() {
    return {
      restrict: 'E',
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