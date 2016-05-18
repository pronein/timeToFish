(function (ng) {

  var dependencies = [
    'environment',
    'ttfSession',
    'ui.router',
    'ttfPrepare',
    'angularCSS'
  ];

  ng.module('ttfApp', dependencies);

})(window.angular);