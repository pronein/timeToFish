(function (ng) {

  var inject = [];

  function RolesSelectorController() {
    var ctrl = this;

    ctrl.vm = {};

    _activate();

    function _activate() {
    }
  }

  RolesSelectorController.$inject = inject;

  ng.module('ttfRoles')
    .controller('RolesSelectorController', RolesSelectorController);

})(window.angular);