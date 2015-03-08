'use strict';

angular.module('smartPaperApp')
  .controller('SidebarCtrl', function ($scope, $window, $location, Auth) {
    $scope.menus = [
      { label: 'Repositori', icon: 'flaticon flaticon-md flaticon-briefcase50', route: '/repositori' },
      { label: 'Repositori', icon: 'flaticon flaticon-md flaticon-briefcase50', route: '/repositori' },
      { label: 'Repositori', icon: 'flaticon flaticon-md flaticon-briefcase50', route: '/' },
      { label: 'Repositori', icon: 'flaticon flaticon-md flaticon-briefcase50', route: '/repositori' }
    ];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getCurrentUser();

    $scope.logout = function() {
      Auth.logout();
      $window.location.href = '/login';
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
