(function (ng) {

  var inject = [];

  function prepareDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/prepare/views/partial-prepare.html',
      css: 'stylesheets/prepare.css',
      controller: 'PrepareController',
      controllerAs: 'vm'
    }
  }

  prepareDirective.$inject = inject;

  ng.module('ttfPrepare')
    .directive('prepare', prepareDirective);

})(window.angular);