(function (ng) {

  var inject = [];

  function prepareChecklistItemDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        itemId: '=',
        showAddNewItem: '='
      },
      templateUrl: 'javascripts/prepare/views/prepare-checklist-item.html',
      controller: 'PrepareChecklistItemController',
      controllerAs: 'vm'
    };
  }

  prepareChecklistItemDirective.$inject = inject;

  ng.module('ttfPrepare')
    .directive('prepareChecklistItem', prepareChecklistItemDirective);

})(window.angular);