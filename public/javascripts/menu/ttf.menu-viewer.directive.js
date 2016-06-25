(function(ng){
  'use strict';
  
  var inject = [];
  
  function menuViewerDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: 'MenuViewerController',
      controllerAs: 'ctrl'
    };
  }
  
  menuViewerDirective.$inject = inject;
  
  ng.module('ttfMenus')
    .directive('menuViewer', menuViewerDirective);
  
})(window.angular);