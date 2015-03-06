'use strict';

angular.module('smartPaperApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $navbar, $mdSidenav) {

    // get default navbar
    $scope.navbar = $navbar.get();

    // toggle sidenav
    $scope.toggleSidenav = function() {
      $mdSidenav('app-sidenav').toggle();
    };

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
