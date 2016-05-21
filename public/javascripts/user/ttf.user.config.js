(function(ng) {
  'use strict';

  var inject = ['$stateProvider'];

  function configSetup($stateProvider) {
    $stateProvider
      .state('register', {
        restrict: 'E',
        url: '/register',
        templateUrl: 'javascripts/user/views/partial-register.html'
      });
  }

  configSetup.$inject = inject;

  ng.module('ttfUser')
    .config(configSetup);

})(window.angular);