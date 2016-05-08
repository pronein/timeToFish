(function (ng) {

  var inject = ['userService'];

  function PrepareController(userService) {
    var ctrl = this;

    var _activeItem = 0;

    ctrl.menu = {
      items: [], //{id: #, stateName: '', displayName: ''}
      isActiveItem: isActiveItem,
      setActiveItem: setActiveItem
    };
    
    init();
    
    function init(){
      userService.refresh().then(function() {
        ctrl.menu.items.splice(0);

        if (userService.menu) {
          ctrl.menu.items = ctrl.menu.items.concat(userService.menu);
        }
      });
    }
    
    function isActiveItem(id){
      return _activeItem === id;
    }

    function setActiveItem(id) {
      _activeItem = id;
    }
  }

  PrepareController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('PrepareController', PrepareController);

})(window.angular);