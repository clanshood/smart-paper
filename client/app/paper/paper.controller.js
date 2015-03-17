'use strict';

angular.module('smartPaperApp')
  .controller('PaperCtrl', function ($scope, $http, Auth, User, $navbar, $mdSidenav) {
    // navbar control
    // get default navbar
    $scope.navbar = $navbar.get();
    $scope.isOpenSearch = false;

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


    // content control
    // content sidebar
    $scope.openPaperInfo = function() {
      $mdSidenav('paper-info-sidenav').open();
    };
    $scope.closePaperInfo = function() {
      $mdSidenav('paper-info-sidenav').close();
    };
    $scope.getPaperInfo = function() {
      $scope.openPaperInfo();
    };
    // swipe action for each paper item
    $scope.swipeItemClass = "";
    $scope.swipeItem = function(dir){
      $scope.swipeItemClass = (dir === "right") ? 'swipe-paper-item-right' : 'swipe-paper-item-left';
    };
    $scope.undoDeleteItem = function(){
      $scope.swipeItemClass = "";
    };

    // sample content
    // simulate data from db
    $scope.items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  });
