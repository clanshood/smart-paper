'use strict';

angular.module('smartPaperApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    // required properties
    $scope.isSidenavControll = true;
    $scope.isSearchBtn = true;
    $scope.brand = "Smart Admin";
    $scope.size = "";
    // theming
    $scope.theme = "default";
    // menus
    $scope.menu = [{
      display: true,
      lists: [{
        label: 'Menu 1',
        link: ''
      }]
    }];


    // optional properties
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.buttons = [{
      label: 'Signup',
      needAuth: false,
      link: '/signup',
      action: false
    },{
      label: 'Login',
      needAuth: false,
      link: '/login',
      action: false
    },{
      label: 'Settings',
      needAuth: true,
      link: '/settings',
      action: false
    },{
      label: 'Logout',
      needAuth: true,
      link: '/logout',
      action: 'logout()'
    }];

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });