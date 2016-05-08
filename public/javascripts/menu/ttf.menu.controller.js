(function (ng) {

  var inject = ['$timeout', 'userService'];

  function MenuController($timeout, userService) {
    var dateOfTrip = moment(new Date('2016-4-30'));
    var ctrl = this;
    ctrl.brandTitle = '';
    ctrl.isAuthenticated = isAuthenticated;

    init();

    function init() {
      ctrl.brandTitle = calculateBrandTitle();
    }

    function isAuthenticated() {
      return userService.isAuthenticated();
    }
    
    function calculateBrandTitle() {
      var now = moment();
      var brandTitle = '';

      if (now < dateOfTrip) {
        var timeUntilTrip = moment.duration(dateOfTrip - now);
        if (timeUntilTrip.months() > 0) {
          brandTitle = timeUntilTrip.months() + ' months to go...';
        } else if (timeUntilTrip.weeks() > 0) {
          brandTitle = timeUntilTrip.weeks() + ' weeks to go...';
        } else {
          brandTitle = buildBrandTitleFromDuration(timeUntilTrip);
          $timeout(updateTimeUntilTrip, 1000);
        }
      } else {
        brandTitle = 'Time To Fish!'
      }

      return brandTitle;
    }

    function updateTimeUntilTrip(){
      ctrl.brandTitle = calculateBrandTitle();
    }

    function buildBrandTitleFromDuration(duration) {
      var brandTitle = '';

      if (duration.days() > 0) {
        brandTitle += duration.days() + ' days ';
      }

      if (duration.hours() > 0) {
        brandTitle += duration.hours() + ' hours ';
      }

      if (duration.minutes() > 0) {
        brandTitle += duration.minutes() + ' minutes ';
      }

      if (duration.seconds() > 0) {
        brandTitle += duration.seconds() + ' seconds ';
      }

      return brandTitle + 'to go...';
    }
  }

  MenuController.$inject = inject;

  ng.module('ttfApp')
      .controller('MenuController', MenuController);

})(window.angular);