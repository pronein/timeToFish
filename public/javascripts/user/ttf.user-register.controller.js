(function (ng) {
  'use strict';

  var inject = [];

  function UserRegisterController() {
    var ctrl = this;

  }

  UserRegisterController.$inject = inject;

  ng.module('ttfUser')
    .controller('UserRegisterController', UserRegisterController);

})(window.angular);