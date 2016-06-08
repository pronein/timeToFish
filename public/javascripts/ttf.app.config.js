(function (ng) {
  var inject = ['envServiceProvider', 'restBaseProvider', '$stateProvider', '$urlRouterProvider',
    '$locationProvider'];

  function configSetup(envServiceProvider, restBaseProvider, $stateProvider, $urlRouterProvider,
                       $locationProvider) {
    envServiceProvider.config(buildEnvironmentConfigOptions());
    envServiceProvider.check();

    restBaseProvider.setBaseUrl(envServiceProvider.read('apiUrl'));

    $locationProvider.html5Mode(true);
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<div>Home</div>'
      })
      .state('temp', {
        url: '/temp',
        template: '<permissions></permissions>'
      });

    function buildEnvironmentConfigOptions() {
      return {
        domains: {
          development: ['localhost'],
          production: ['ajschrader.com']
        },
        vars: {
          development: {
            apiUrl: 'http://localhost:3010'
          },
          production: {
            apiUrl: 'http://fishing.ajschrader.com'
          }
        }
      };
    }
  }

  configSetup.$inject = inject;

  ng.module('ttfApp')
    .config(configSetup);
})(window.angular);