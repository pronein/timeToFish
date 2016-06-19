(function (ng) {

  var inject = ['restBase'];

  function MembersService(restBase) {
    var service = this;

    service.data = {
      members: []
    };

    service.loadMembers = loadAllMembers;

    function loadAllMembers() {
      //TODO: Implement me
    }
  }

  MembersService.prototype.uris = {};

  MembersService.$inject = inject;

  ng.module('ttfMembers')
    .service('membersService', MembersService);

})(window.angular);