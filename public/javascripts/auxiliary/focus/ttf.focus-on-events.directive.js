(function (ng) {

  var inject = ['focus'];

  function focusOnEventsDirective(focus) {
    return function (scope, element, attributes) {
      if (!Array.isArray(attributes.focusOnEvents)) {
        attributes.focusOnEvents = [].push(attributes.focusOnEvents);
      }

      attributes.focusOnEvents.forEach(function (idx, array) {
        var eventName = array[idx];
        
        element.on(eventName, function () {
          focus(attributes.focusOnId);
        });
      });
      
      scope.$on('$destroy', function () {
        attributes.focusOnEvents.forEach(function(idx, array) {
          var eventName = array[idx];
          
          element.off(eventName);
        });
      });
    };
  }

  focusOnEventsDirective.$inject = inject;

  ng.module('ttfApp')
    .directive('focusOnEvents', focusOnEventsDirective);

})(window.angular);