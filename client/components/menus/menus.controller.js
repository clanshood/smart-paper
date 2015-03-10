'use strict';

angular.module('smartPaperApp')
  .controller('MenusCtrl', function ($scope, $location) {

    $scope.isActive = function(route){
      return route === $location.path();
    };
    $scope.isOpen = false;
    $scope.toggleOpen = function(route){
      return $scope.isOpen = !$scope.isOpen;
    };
  });
