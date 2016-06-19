(function (ng) {

  var inject = ['restBase'];

  function MembersService(restBase) {
    var service = this;

    service.data = {
      members: []
    };

    service.loadMembers = loadAllMembers;
    service.findByUsername = findByUsername;
    service.userHasRole = userHasRole;

    _initializeService();

    function _initializeService(){
      console.info('service-init-members');
      
      service.loadMembers();
    }

    function loadAllMembers() {
      restBase.get(service.uris.getMemberData, true)
        .then(function(users) {
          service.data.members = users;
        });
    }

    function findByUsername(username) {
      if(!username || typeof username !== 'string') return null;

      var user = service.data.members.find(function(user) {
        return user.username.toLowerCase() === username.toLowerCase();
      });

      return user;
    }

    function userHasRole(username, role) {
      if(!role || typeof role !== 'string') return false;

      var user = service.findByUsername(username);

      return user.roles.some(function(userRole) {
        return userRole && typeof userRole.name === 'string' && userRole.name.toLowerCase() === role.toLowerCase();
      });
    }
  }

  MembersService.prototype.uris = {
    /*GET*/ getMemberData: '/api/users'
  };

  MembersService.$inject = inject;

  ng.module('ttfMembers')
    .service('membersService', MembersService);

})(window.angular);