'use strict';

angular.module('smartPaperApp')
  .directive('menus', function () {
    return {
      templateUrl: 'components/menus/menus.html',
      restrict: 'EA',
      controller: 'MenusCtrl'
    };
  });