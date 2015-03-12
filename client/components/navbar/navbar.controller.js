'use strict';

angular.module('smartPaperApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $mdSidenav, $navbar) {

    // required properties
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
    $scope.closeEsc = function(e) {
      var isEscape = (e.keyCode === $mdConstant.KEY_CODE.ESCAPE);
      console.log(isEscape);
    };

    // optional properties
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.navbar.buttons = [{
      label: "Signup",
      needAuth: true,
      link: "/signup",
      action: ""
    },{
      label: "Login",
      needAuth: false,
      link: "/login",
      action: ""
    },{
      label: "Settings",
      needAuth: true,
      link: "/settings",
      action: ""
    },{
      label: "Logout",
      needAuth: true,
      link: "/logout",
      action: "logout"
    }];

    $scope.btnEvent = function(action){
      if (action || action !== '') {
        $scope.$eval(action)();
      };
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });