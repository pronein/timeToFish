(function (ng) {
  'use strict';

  var inject = ['userService'];

  function SessionController(userService) {
    var ctrl = this;

    ctrl.user = userService;
    ctrl.credentials = {
      username: '',
      password: '',
      requestIsFromUser: false
    };
    ctrl.signedIn = userService.isAuthenticated();
    ctrl.errorMessage = '';

    ctrl.usernameHasError = false;
    ctrl.passwordHasError = false;

    ctrl.signin = signin;
    ctrl.logout = logout;

    signin(false);

    function signin(requestIsFromUser) {
      ctrl.credentials.requestIsFromUser = requestIsFromUser;
      userService.signIn(ctrl.credentials)
          .then(function(){
            ctrl.signedIn = userService.isAuthenticated();

            if(requestIsFromUser && !ctrl.signedIn){
              ctrl.usernameHasError = true;
              ctrl.passwordHasError = true;
            }
          });
    }

    function logout() {
      userService.logOut()
          .then(function() {
            ctrl.signedIn = userService.isAuthenticated();
          });
    }
  }

  SessionController.$inject = inject;

  ng.module('ttfSession')
      .controller('SessionController', SessionController);

})(window.angular);