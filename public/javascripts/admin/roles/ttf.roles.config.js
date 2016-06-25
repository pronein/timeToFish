(function (ng) {
  'use strict';
  
  var inject = ['$stateProvider'];

  function rolesConfig($stateProvider) {
    $stateProvider
      .state('roles', {
        url: '/roles',
        template: '<roles></roles>'
      });
  }

  rolesConfig.$inject = inject;

  ng.module('ttfRoles')
    .config(rolesConfig);

})(window.angular);