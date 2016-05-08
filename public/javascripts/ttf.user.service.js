(function (ng) {
  'use strict';

  var inject = ['restBase'];

  function userService(restBase) {
    var _isAuthenticated;

    var service = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      roles: [],
      menu: [],
      isAuthenticated: isAuthenticated,
      signIn: signIn,
      logOut: logOut,
      refresh: loadUser
    };

    return service;

    function loadUser() {
      var request = restBase.get(restBase.urls.getUser);
      return _handleUserResponse(request);
    }

    function setUser(userData) {
      service.username = userData.username;
      service.email = userData.email;
      service.firstName = userData.firstName;
      service.lastName = userData.lastName;
      service.middleName = userData.middleName;
      service.roles = userData.roles;
      service.menu = userData.menu;

      service.menu = [{id: 1, stateName: 'one', displayName: 'One (1)'}, {id: 2, stateName: 'two', displayName: 'Two (2)'}, {id: 3, stateName: 'three', displayName: 'Three (3)'}];
    }

    function isAuthenticated() {
      return _isAuthenticated;
    }

    function signIn(credentials) {
      var request = restBase.post(restBase.urls.authenticate, credentials);
      return _handleUserResponse(request);
    }

    function logOut(){
      return restBase.post(restBase.urls.logout)
          .then(function(response){

          }).catch(function(error){

          }).finally(function(){
            _isAuthenticated = false;
          });
    }

    function _handleUserResponse(request) {
      return request.then(function (response) {
        setUser(response.data);
        _isAuthenticated = true;
      }).catch(function () {
        _isAuthenticated = false;
      });
    }
  }

  userService.$inject = inject;

  ng.module('ttfApp')
      .factory('userService', userService);

})(window.angular);