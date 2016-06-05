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

    function post(urlPath, payload, responseOnly) {
      var options = setupRestCall(urlPath, 'POST');

      options.data = ng.toJson(payload);

      return callRestTarget(options, responseOnly);
    }

    function get(urlPath, paramsObj, responseOnly) {
      var options = setupRestCall(urlPath, 'GET');

      if (paramsObj === true)
        responseOnly = true;
      else if (paramsObj)
        options.params = paramsObj;

      return callRestTarget(options, responseOnly);
    }

    function setupRestCall(url, method) {
      return {
        url: baseUrl + url,
        method: method,
        cache: false,
        responseType: 'json'
      };
    }

    function callRestTarget(options, responseOnly) {
      return $http(options)
        .then(function (response) {
          console.info(options.method.toUpperCase() + ' ' + options.url + ' ' + response.status);

          return responseOnly ? response.data : response;
        });
    }

    RestBaseService.prototype.urls = {
      authenticate: '/api/authenticate',
      logout: '/api/authenticate/release',
      getUserMenuFor: '/api/users/current/menu',
      validateUsername: '/api/users/usernameExists',
      registerUser: '/api/users'
    };
  }

  restBaseProvider.$inject = providerInject;

  ng.module('ttfApp')
    .provider('restBase', restBaseProvider);

})(window.angular);