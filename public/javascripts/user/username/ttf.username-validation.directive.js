(function (ng) {

  var inject = ['$q', 'userService'];

  function usernameValidation($q, userService) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$asyncValidators.username = function(modelUsername, viewUsername) {
          console.log('modelUsername: ' + modelUsername);
          console.log('viewUsername: ' + viewUsername);
          
          if(ngModelCtrl.$isEmpty(modelUsername)){
            return $q.when();
          }

          var def = $q.defer();

          userService.validateUsername(modelUsername)
            .then(function(isValid) {
              isValid ? def.resolve() : def.reject();
            }, function(err) {
              console.log(err);
              def.reject();
            });

          return def;
        }
      }
    }
  }

  usernameValidation.$inject = inject;

  ng.module('ttfUser')
    .directive('username', usernameValidation);

})(window.angular);