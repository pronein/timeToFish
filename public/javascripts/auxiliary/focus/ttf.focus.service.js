(function (ng) {

  var inject = ['$timeout', '$window'];

  function focusService($timeout, $window) {
    return function(elementId) {
      $timeout(function() {
        var element = $window.document.getElementById(elementId);
        if(element) element.focus();
      })
    };
  }

  focusService.$inject = inject;

  ng.module('ttfApp')
    .factory('focus', focusService);

})(window.angular);