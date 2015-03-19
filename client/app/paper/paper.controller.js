'use strict';

angular.module('smartPaperApp')
  .controller('PaperCtrl', function ($scope, $http, Auth, User, $navbar, $mdSidenav, socket) {
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

    // sample content
    // simulate data from db
    $scope.items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    // Grab the initial set of available papers
    $http.get('/api/papers').success(function(papers) {
      $scope.papers = papers;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('paper', $scope.papers, function(event, paper, papers) {
        // This callback is fired after the papers array is updated by the socket listeners

        // sort the array every time its modified
        papers.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });
  });
