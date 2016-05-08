(function (ng) {

  var inject = ['userService'];

  function PrepareController(userService) {
    var ctrl = this;
    
    ctrl.menu = {
      items: [], //{id: #, stateName: ''}
      isActiveItem: isActiveItem
    };
    
    init();
    
    function init(){
      var user = userService.
    }
    
    function isActiveItem(id){
      for(var i = 0, iLen = ctrl.menu.items.length; i < iLen; i++){
        var item = ctrl.menu.items[i];
        if (item.id === id) return true;
      }

      return false;
    }
  }

  PrepareController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('PrepareController', PrepareController);

})(window.angular);