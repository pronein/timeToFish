(function (ng) {

  var inject = [];

  function prepareChecklistDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'javascripts/prepare/views/prepare-checklist.html',
      link: link,
      css: 'stylesheets/prepare.css',
      scope: {
        listTitle: '='
      },
      controller: 'PrepareChecklistController',
      controllerAs: 'vm'
    };
  }

  function link(scope, element, attrs) {
    scope.tbody = angular.element(element[0].getElementsByTagName('tbody')[0]);
    scope.vm.activate();
  }

  prepareChecklistDirective.$inject = inject;

  ng.module('ttfPrepare')
    .directive('prepareChecklist', prepareChecklistDirective);

})(window.angular);