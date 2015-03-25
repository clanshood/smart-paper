'use strict';

angular.module('smartPaperApp')
  .directive('paperItem', function () {
    return {
      templateUrl: 'app/paper/paper-item/paper-item.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });