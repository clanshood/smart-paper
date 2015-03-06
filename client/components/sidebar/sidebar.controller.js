'use strict';

angular.module('smartPaperApp')
  .controller('SidebarCtrl', function ($scope, $window, Auth) {
    $scope.menus = [
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' }
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
