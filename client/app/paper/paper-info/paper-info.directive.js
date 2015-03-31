'use strict';

angular.module('smartPaperApp')
  .directive('paperInfo', function () {
    return {
      templateUrl: 'app/paper/paper-info/paper-info.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });