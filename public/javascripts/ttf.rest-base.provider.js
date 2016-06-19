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
    this.delete = remove;
    this.put = put;

    function post(urlPath, payload, responseOnly) {
      var options = _setupRestCall(urlPath, 'POST');

      options.data = ng.toJson(payload);

      return _callRestTarget(options, responseOnly);
    }

    function get(urlPath, paramsObj, responseOnly) {
      var options = _setupRestCall(urlPath, 'GET');

      if (paramsObj === true)
        responseOnly = true;
      else if (paramsObj)
        options.params = paramsObj;

      return _callRestTarget(options, responseOnly);
    }

    function remove(urlPath, iParams) {
      var options = _setupRestCall(urlPath, 'DELETE', iParams);

      return _callRestTarget(options);
    }

    function put(urlPath, payload, iParams, responseOnly) {
      var options = _setupRestCall(urlPath, 'PUT', iParams);

      options.data = ng.toJson(payload);

      return _callRestTarget(options, responseOnly);
    }

    function _setupRestCall(url, method, iParams) {
      url = url.replace(/:(\w+)/gi, function(match, prop) {
        return iParams[prop];
      });

      return {
        url: baseUrl + url,
        method: method,
        cache: false,
        responseType: 'json'
      };
    }

    function _callRestTarget(options, responseOnly) {
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