(function (ng) {

  var inject = [];

  function ttfMembersSelectorDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/admin/members/views/partial-members-selector.html',
      controller: 'MembersSelectorController',
      controllerAs: 'ctrl',
      scope: true,
      replace: true
    };
  }

  ttfMembersSelector.$inject = inject;

  ng.module('ttfMembers')
    .directive('ttfMembersSelector', ttfMembersSelectorDirective);

})(window.angular);