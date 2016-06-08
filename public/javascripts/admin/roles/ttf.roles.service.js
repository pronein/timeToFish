(function (ng) {

  var inject = ['restBase'];

  function RolesService(restBase) {
    var service = this;
    
    service.data = {
      
    };
  }
  
  RolesService.prototype.uris = {
    
  };

  RolesService.$inject = inject;

  ng.module('ttfRoles')
    .service('rolesService', RolesService);

})(window.angular);