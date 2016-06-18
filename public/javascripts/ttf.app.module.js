(function (ng) {

  var dependencies = [
    'environment',
    'ttfSession',
    'ui.router',
    'ttfPrepare',
    'angularCSS',
    'ttfPermissions',
    'ttfRoles'
  ];

  ng.module('ttfApp', dependencies);

})(window.angular);