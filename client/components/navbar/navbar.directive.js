'use strict';

angular.module('smartPaperApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'EA'
    };
  });