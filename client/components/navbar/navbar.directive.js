'use strict';

angular.module('smartPaperApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        //element.text('this is the navbar directive');
      }
    };
  });