(function (ng) {

  var dependencies = [
    'environment',
    'ttfSession',
    'ui.router',
    'ttfPrepare',
    'angularCSS',
    'ttfPermissions'
  ];

  ng.module('ttfApp', dependencies);

})(window.angular);