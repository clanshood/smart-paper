'use strict';

angular.module('smartPaperApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'EA',
      controller: 'SidebarCtrl'
    };
  });