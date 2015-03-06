'use strict';

angular.module('smartPaperApp')
  .controller('SidebarCtrl', function ($scope, Auth) {
    $scope.menus = [
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' },
      { label: 'Repositori', icon: 'flaticon-briefcase50', link: '/repositori' }
    ];

    $scope.user = Auth.getCurrentUser();
    console.log($scope.user);
  });
