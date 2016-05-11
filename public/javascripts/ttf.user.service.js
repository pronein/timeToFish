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
      
      menu: [],
      
      isAuthenticated: isAuthenticated,
      signIn: signIn,
      logOut: logOut,
      loadMenuFor: loadMenu
    };

    return service;

    function loadMenu(stateName) {
      var request = restBase.get(restBase.urls.getUserMenuFor, {ownerState: stateName});
      return _handleMenuResponse(request);
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

    function _setUser(userData) {
      service.username = userData.username;
      service.email = userData.email;
      service.firstName = userData.firstName;
      service.lastName = userData.lastName;
      service.middleName = userData.middleName;
    }

    function _setMenu(menuItems) {
      service.menu = menuItems;
    }

    function _handleUserResponse(request) {
      return request.then(function (response) {
        if(response.status === 200) {
          _setUser(response.data);
          _isAuthenticated = true;
        }
      }).catch(function (err) {
        console.log('_handleUserResponse: ' + err);
        _isAuthenticated = false;
      });
    }

    function _handleMenuResponse(request) {
      return request.then(function(response){
        if(response.status === 200) {
          _setMenu(response.data);
        }
      }).catch(function(err){
        console.log('_handleMenuResponse: ' + err);
      });
    }
  }

  userService.$inject = inject;

  ng.module('ttfApp')
      .factory('userService', userService);

})(window.angular);