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
      loadMenuFor: loadMenu,
      registerNewUser: registerUser,
      validateUsername: doesUsernameAlreadyExist
    };

    return service;

    function registerUser(userModel) {
      alert('registering account for ' + userModel.username);
      
      var request =  restBase.post(restBase.urls.registerUser, userModel);
      return _handleRegistrationResponse(request);
    }

    function doesUsernameAlreadyExist(username) {
      console.log('checking if username (' + username + ') already exists...');

      return restBase.post(restBase.urls.validateUsername, {username: username}, true);
    }

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

    function logOut() {
      return restBase.post(restBase.urls.logout)
        .then(function (response) {

        }).catch(function (error) {

        }).finally(function () {
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
      return request.then(function (user) {
        _setUser(user);
        _isAuthenticated = true;
      }).catch(function (err) {
        console.log('_handleUserResponse: ' + err.status + ' ' + err.statusText);
        _isAuthenticated = false;
      });
    }

    function _handleMenuResponse(request) {
      return request.then(function (response) {
        if (response.status === 200) {
          _setMenu(response.data);
        }
      }).catch(function (err) {
        console.log('_handleMenuResponse: ' + err.status + ' ' + err.statusText);
      });
    }
    
    function _handleRegistrationResponse(request) {
      return request.then(function (response) {
        if (response.status === 201) {
          
        }
      }).catch(function (err) {
        console.log('_handleRegistrationResponse: ' + err.status + ' ' + err.statusText);
      });
    }
  }

  userService.$inject = inject;

  ng.module('ttfApp')
    .factory('userService', userService);

})(window.angular);