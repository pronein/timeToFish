(function(ng) {
  'use strict';

  var inject = [];

  var compareToDirective = function() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue === scope.otherModelValue;
        }

        scope.$watch('otherModelValue', function(){
          ngModel.$validate();
        });
      }
    };
  };

  compareToDirective.$inject = inject;

  ng.module('ttfApp')
    .directive('compareTo', compareToDirective);

})(window.angular);