'use strict';

angular.module('smartPaperApp')
  .directive('paperCreator', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        element.on('click', function(){
          var isExpand = element.hasClass('expand'),
              cards = document.querySelectorAll('.pc-card');

          if (isExpand) {
            element.removeClass('expand');
            element.addClass('active');
          } else{
            angular.element(cards).removeClass('active expand');
            element.addClass('expand');
          }
        });
      }
    };
  });