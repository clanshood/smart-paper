'use strict';

angular.module('smartPaperApp')
  .directive('alphabetColor', function ($mdColorPalette) {
    return {
      restrict: 'A',
      multiElement: true,
      scope: {
        alphabetColor: '='
      },
      link: function (scope, element, attrs) {
        var colorDeep = (attrs.colorDeep) ? attrs.colorDeep : 600,
            colorDeepMin = ( angular.isNumber(colorDeep) ) ? parseInt(colorDeep) - 100 : ( parseInt(colorDeep.substr(1, 3)) - 100),
            colorDeepMin = ( colorDeepMin < 100 ) ? 50 : colorDeepMin,
            palette = {
          'a' : $mdColorPalette['red'][colorDeep],
          'b' : $mdColorPalette['pink'][colorDeep],
          'c' : $mdColorPalette['purple'][colorDeep],
          'd' : $mdColorPalette['deep-purple'][colorDeep],
          'e' : $mdColorPalette['indigo'][colorDeep],
          'f' : $mdColorPalette['blue'][colorDeep],
          'g' : $mdColorPalette['light-blue'][colorDeep],
          'h' : $mdColorPalette['cyan'][colorDeep],
          'i' : $mdColorPalette['teal'][colorDeep],
          'j' : $mdColorPalette['green'][colorDeep],
          'k' : $mdColorPalette['light-green'][colorDeep],
          'l' : $mdColorPalette['lime'][colorDeep],
          'm' : $mdColorPalette['yellow'][colorDeep],
          'n' : $mdColorPalette['amber'][colorDeep],
          'o' : $mdColorPalette['orange'][colorDeep],
          'p' : $mdColorPalette['deep-orange'][colorDeep],
          'q' : $mdColorPalette['brown'][colorDeep],
          'r' : $mdColorPalette['grey'][colorDeep],
          's' : $mdColorPalette['blue-grey'][colorDeep],
          't' : $mdColorPalette['red'][colorDeepMin],
          'u' : $mdColorPalette['pink'][colorDeepMin],
          'v' : $mdColorPalette['purple'][colorDeepMin],
          'w' : $mdColorPalette['deep-purple'][colorDeepMin],
          'x' : $mdColorPalette['indigo'][colorDeepMin],
          'y' : $mdColorPalette['blue'][colorDeepMin],
          'z' : $mdColorPalette['light-blue'][colorDeepMin],
        };

        scope.drawColor = function(colors){
          if (attrs.colorOnly) {
              element.css({
                color: 'rgb(' + colors.value[0] + ',' + colors.value[1] + ',' + colors.value[2] +')'
              });
            } else{
              element.css({
                color: 'rgba(' + colors.contrast[0] + ',' + colors.contrast[1] + ',' + colors.contrast[2] +',' + colors.contrast[3] +')',
                backgroundColor: 'rgb(' + colors.value[0] + ',' + colors.value[1] + ',' + colors.value[2] +')',
              });
            }
        };

        scope.$watch('alphabetColor', function(newValue, oldValue) {
          if (newValue){
            var colors = palette[angular.lowercase(scope.alphabetColor)];
            scope.drawColor(colors);
          }
        }, false);
      }
    };
  });