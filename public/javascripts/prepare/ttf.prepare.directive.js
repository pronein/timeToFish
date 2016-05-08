(function (ng) {

  var inject = [];

  function prepareDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/prepare/views/prepare.html',
      controller: 'PrepareController',
      controllerAs: 'vm'
    }
  }

  prepareDirective.$inject = inject;

  ng.module('ttfPrepare')
    .directive('prepare', prepareDirective);

})(window.angular);