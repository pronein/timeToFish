(function(ng) {
  'use strict';

  var inject = ['$stateProvider'];

  function configSetup($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'javascripts/user/views/partial-register.html',
        controller: 'UserRegisterController',
        controllerAs: 'vm'
      });
  }

  configSetup.$inject = inject;

  ng.module('ttfUser')
    .config(configSetup);

})(window.angular);