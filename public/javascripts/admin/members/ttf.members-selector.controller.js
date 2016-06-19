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
      
    }
    
    function onMemberClicked($event) {
      
    }
  }

  MembersSelectorController.$inject = inject;

  ng.module('ttfMembers')
    .controller('MembersSelectorController', MembersSelectorController);

})(window.angular);