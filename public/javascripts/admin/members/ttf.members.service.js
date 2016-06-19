(function (ng) {

  var inject = ['restBase'];

  function MembersService(restBase) {
    var service = this;

    service.data = {
      members: []
    };

    service.loadMembers = loadAllMembers;

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
  }

  MembersService.prototype.uris = {
    /*GET*/ getMemberData: '/api/users'
  };

  MembersService.$inject = inject;

  ng.module('ttfMembers')
    .service('membersService', MembersService);

})(window.angular);