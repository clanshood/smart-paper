'use strict';

angular.module('smartPaperApp')
  .controller('PaperCreatorCtrl', function ($scope, $navbar, $mdSidenav) {
    $scope.navbar = $navbar.set({
      isSidenavControll: false,
      isSearchBtn: false,
      brand: 'Buat Paper Baru'
    });

    // app search actions
    $scope.openSearch = function() {
      $scope.isOpenSearch = true;
    };
    $scope.closeSearch = function() {
      $scope.isOpenSearch = false;
    };
    // end of navbar controll

    // sidebar control
    $scope.toggleSidenav = function() {
      $mdSidenav('app-sidenav').toggle();
    };
    // end of sidebar control
  });
