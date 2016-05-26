(function (ng) {

  var inject = [];

  function userRegisterDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'javascripts/user/views/register.html',
      controller: 'UserRegisterController',
      controllerAs: 'vm'
    }
  }

  userRegisterDirective.$inject = inject;

  ng.module('ttfUser')
    .directive('userRegister', userRegisterDirective);

})(window.angular);

