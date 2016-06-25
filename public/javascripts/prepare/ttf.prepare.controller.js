(function (ng) {
  //TODO: Add functionality to create/delete/view lists (clientside + serverside)
  //TODO: Add functionality to save list state
  //TODO: Add functionality to toggle lists/list-items as public/private/secret(public, but hidden)
  //TODO: Add functionality to toggle list user permissions (modify/delete/view)
  var inject = ['userService'];

  function PrepareController(userService) {
    var ctrl = this;

    var _activeItem = 0;

    ctrl.menu = {
      items: [], //{menuId: #, name: {state: '', display: ''}}
      isActiveItem: isActiveItem,
      setActiveItem: setActiveItem
    };
    
    init();
    
    function init(){
      userService.loadMenuFor('prepare').then(function() {
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