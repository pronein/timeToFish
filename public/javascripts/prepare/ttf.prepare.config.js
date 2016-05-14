(function (ng) {
  var inject = ['$stateProvider', '$urlRouterProvider'];

  function configSetup($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('prepare', {
        url: '/prepare',
        template: '<prepare></prepare>'
      })
      .state('prepare.checklist', {
        url: '/checklists',
        templateUrl: 'javascripts/prepare/views/prepare-checklist.html'
      });
  }

  configSetup.$inject = inject;

  ng.module('ttfPrepare')
    .config(configSetup);
})(window.angular);