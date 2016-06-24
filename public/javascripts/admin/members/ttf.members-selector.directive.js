(function (ng) {

  var inject = [];

  function ttfMembersSelectorDirective() {
    return {
      restrict: 'E',
      templateUrl: 'javascripts/admin/members/views/partial-members-selector.html',
      controller: 'MembersSelectorController',
      controllerAs: 'ctrl',
      scope: {
        selectedMembers: '=selectedMembers'
      },
      replace: true
    };
  }

  ttfMembersSelectorDirective.$inject = inject;

  ng.module('ttfMembers')
    .directive('ttfMembersSelector', ttfMembersSelectorDirective);

})(window.angular);