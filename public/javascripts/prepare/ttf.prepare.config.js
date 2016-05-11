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
        template: '<h1>Checklists</h1><h1>Checklists</h1><h1>Checklists</h1><h1>Checklists</h1><h1>Checklists</h1><h1>Checklists</h1>'
      });
  }

  configSetup.$inject = inject;

  ng.module('ttfPrepare')
    .config(configSetup);
})(window.angular);