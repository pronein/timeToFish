(function (ng) {

  var inject = [];

  function sessionProfileDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/auth/views/auth.html',
      controller: 'SessionController',
      controllerAs: 'session'
    }
  }

  sessionProfileDirective.$inject = inject;

  ng.module('ttfSession')
      .directive('sessionProfile', sessionProfileDirective);

})(window.angular);

