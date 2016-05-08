(function (ng) {

  var factoryInject = ['$http'];
  var providerInject = [];

  function restBaseProvider() {
    var baseUrl = '';

    this.setBaseUrl = setBaseUrl;

    function setBaseUrl(url) {
      baseUrl = url;
    }

    this.$get = restBaseFactory;

    function restBaseFactory($http) {

      return new RestBaseService($http, baseUrl);
    }

    restBaseFactory.$inject = factoryInject;
  }

  function RestBaseService($http, baseUrl) {
    this.post = post;
    this.get = get;

    function post(urlPath, payload) {
      var options = setupRestCall(urlPath, 'POST');

      options.data = payload;

      return callRestTarget(options);
    }

    function get(urlPath, paramsObj) {
      var options = setupRestCall(urlPath, 'GET');

      options.params = paramsObj;

      return callRestTarget(options);
    }

    function setupRestCall(url, method) {
      return {
        url: baseUrl + url,
        method: method,
        cache: false,
        responseType: 'json'
      };
    }

    function callRestTarget(options){
      return $http(options);
    }

    RestBaseService.prototype.urls = {
      authenticate: '/api/authenticate',
      logout: '/api/authenticate/release'
    };
  }

  restBaseProvider.$inject = providerInject;

  ng.module('ttfApp')
      .provider('restBase', restBaseProvider);

})(window.angular);