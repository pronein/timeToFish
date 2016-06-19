(function (ng) {

  var inject = ['membersService', 'rolesService'];

  function MembersSelectorController(membersService, rolesService) {
    var ctrl = this;

    ctrl.vm = {
      membersData: membersService.data,
      selectedMembers: rolesService.data.members
    };

    ctrl.isMemberChecked = isMemberChecked;
    ctrl.onMemberClicked = onMemberClicked;

    _activate();

    function _activate() {

    }

    function isMemberChecked(username) {
      return membersService.userHasRole(username, rolesService.data.name);
    }

    function onMemberClicked($event) {
      var target = $event.target,
        idx = rolesService.indexOfByUsername(target.id),
        isChecked = target.checked;

      if (isChecked && idx === -1) {
        var user = membersService.findByUsername(target.id);

        ctrl.vm.selectedMembers.push(user);
      } else if (!isChecked && idx !== -1)
        ctrl.vm.selectedMembers.splice(idx, 1);

      console.log('Selected members for current role: ' + ctrl.vm.selectedMembers.map(function (member) {
          return member.username.toLowerCase();
        }).join(', '));
    }
  }

  MembersSelectorController.$inject = inject;

  ng.module('ttfMembers')
    .controller('MembersSelectorController', MembersSelectorController);

})(window.angular);