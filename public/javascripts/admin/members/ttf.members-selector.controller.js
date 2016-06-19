(function (ng) {

  var inject = ['membersService'];

  function MembersSelectorController(membersService) {
    var ctrl = this;

    ctrl.vm = {
      membersData: membersService.data
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