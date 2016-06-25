(function (ng) {
  'use strict';

  var inject = ['restBase'];

  function userService(restBase) {
    var service = {
      user: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',

        menu: [],
        isAuthenticated: false
      },

      signIn: _signIn,
      logOut: _logOut,
      loadMenuFor: _loadMenu,
      registerNewUser: _registerUser,
      validateUsername: _doesUsernameAlreadyExist
    };

    return service;

    function _registerUser(userModel) {
      alert('registering account for ' + userModel.username);
      
      var request =  restBase.post(restBase.urls.registerUser, userModel);
      return _handleRegistrationResponse(request);
    }

    function _doesUsernameAlreadyExist(username) {
      console.log('checking if username (' + username + ') already exists...');

      return restBase.post(restBase.urls.validateUsername, {username: username}, true);
    }

    function _loadMenu(stateName) {
      var request = restBase.get(restBase.urls.getUserMenuFor, {ownerState: stateName});
      return _handleMenuResponse(request);
    }
    
    function _signIn(credentials) {
      var request = restBase.post(restBase.urls.authenticate, credentials);
      return _handleUserResponse(request);
    }

    function _logOut() {
      return restBase.post(restBase.urls.logout)
        .then(function (response) {

        }).catch(function (error) {

        }).finally(function () {
          service.user.isAuthenticated = false;
        });
    }

    function _setUser(userData) {
      service.user.username = userData.username;
      service.user.email = userData.email;
      service.user.firstName = userData.name.first;
      service.user.lastName = userData.name.last;
      service.user.middleName = userData.name.middle;
    }

    function _setMenu(menuItems) {
      service.user.menu = menuItems;
    }

    function _handleUserResponse(request) {
      return request.then(function (response) {
        _setUser(response.data);
        service.user.isAuthenticated = true;
      }).catch(function (err) {
        console.log('_handleUserResponse: ' + err.status + ' ' + err.statusText);
        service.user.isAuthenticated = false;
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
          _setUser(response.data);
          service.user.isAuthenticated = true;
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