(function (ng) {

  var inject = [];

  function userRegisterDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'javascripts/user/views/register.html',
      controller: 'UserRegisterController',
      controllerAs: 'register'
    }
  }

  userRegisterDirective.$inject = inject;

  ng.module('ttfUser')
    .directive('userRegister', userRegisterDirective);

})(window.angular);

