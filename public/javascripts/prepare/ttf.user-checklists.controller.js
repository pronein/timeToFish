(function (ng) {

  var inject = ['userService'];

  function userChecklistsController(userService) {
    var ctrl = this;
    
    ctrl.lists = [];
    
    init();
    
    function init() {
      
    }
    
    
  }

  userChecklistsController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('UserChecklistsController', userChecklistsController);

})(window.angular);