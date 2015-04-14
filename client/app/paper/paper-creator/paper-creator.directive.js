'use strict';

angular.module('smartPaperApp')
  .directive('paperCreator', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var cards = document.querySelectorAll('pc-card');

        element.find('pc-card-header').on('click', function(e){
          console.log(e.target);
          var isExpand = element.hasClass('expand');

          if (isExpand) {
            element.removeClass('expand');
            element.addClass('focus');
          } else{
            angular.element(cards).removeClass('focus expand');
            element.addClass('expand');
          }
        });
      }
    };
  });