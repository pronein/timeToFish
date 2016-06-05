(function (ng) {
  'use strict';

  var inject = ['userService'];

  function SessionController(userService) {
    var ctrl = this;

    ctrl.user = userService.user;
    ctrl.credentials = {
      username: '',
      password: '',
      requestIsFromUser: false
    };
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
            if(requestIsFromUser && !ctrl.user.isAuthenticated){
              ctrl.usernameHasError = true;
              ctrl.passwordHasError = true;
            }
          });
    }

    function logout() {
      userService.logOut();
    }
  }

  SessionController.$inject = inject;

  ng.module('ttfSession')
      .controller('SessionController', SessionController);

})(window.angular);