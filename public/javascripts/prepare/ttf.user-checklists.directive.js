(function (ng) {

  var inject = [];

  function userChecklistsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/prepare/views/user-checklists.html',
      controller: 'UserChecklistsController',
      controllerAs: 'vm'
    };
  }

  userChecklistsDirective.$inject = inject;

  ng.module('ttfPrepare')
    .directive('userChecklists', userChecklistsDirective);

})(window.angular);