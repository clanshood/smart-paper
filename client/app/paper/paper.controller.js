'use strict';

angular.module('smartPaperApp')
  .controller('PaperCtrl', function ($scope, $http, Auth, User, $navbar, $mdSidenav) {
    // get default navbar
    $scope.navbar = $navbar.get();
    $scope.isOpenSearch = false;

    // toggle sidenav
    $scope.toggleSidenav = function() {
      $mdSidenav('app-sidenav').toggle();
    };

    // app search actions
    $scope.openSearch = function() {
      $scope.isOpenSearch = true;
    };
    $scope.closeSearch = function() {
      $scope.isOpenSearch = false;
    };

    // items
    $scope.items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  });
