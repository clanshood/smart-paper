'use strict';

angular.module('smartPaperApp')
  .controller('MenusCtrl', function ($scope, $location) {
    $scope.menus = {};

    $scope.isActive = function(route){
      return route === $location.path();
    };
  });
