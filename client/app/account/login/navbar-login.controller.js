'use strict';

angular.module('smartPaperApp')
  .controller('NavbarLoginCtrl', function ($scope, $navbar) {

    // set navbar properties for login page
    $scope.navbar = $navbar.set({
      isSidenavControll: false,
      isSearchBtn: false,
      brand: 'Login',
      menu: {
        display: false
      },
    });
  });
