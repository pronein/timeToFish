(function (ng) {

  var inject = [];

  function permissionsController() {
    var ctrl = this;
  }

  permissionsController.$inject = inject;

  ng.module('ttfPermissions')
    .controller('PermissionsController', permissionsController);

})(window.angular);