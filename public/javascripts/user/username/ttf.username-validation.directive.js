(function (ng) {

  var inject = ['$q', 'userService'];

  function usernameValidation($q, userService) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$asyncValidators.username = function (modelUsername) {
          if (ngModelCtrl.$isEmpty(modelUsername)) {
            return $q.when();
          }

          var verificationDeferment = $q.defer();

          userService.validateUsername(modelUsername)
            .then(function (isValid) {
              isValid ?
                verificationDeferment.resolve() :
                verificationDeferment.reject();
            })
            .catch(function (err) {
              console.log(err);
              verificationDeferment.reject();
            });

          return verificationDeferment.promise;
        }
      }
    }
  }

  usernameValidation.$inject = inject;

  ng.module('ttfUser')
    .directive('username', usernameValidation);

})(window.angular);