'use strict';

angular.module('smartPaperApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ngTouch',
  'velocity.ui',
  'ngMaterial'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/paper/paper.html',
        controller: 'PaperCtrl',
        authenticate: true
      });
    $urlRouterProvider
      .otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('purple', {
        'default': '600',
        'hue-1': '900',
        'hue-2': 'A700',
        'hue-3': 'A100',
      })
      .accentPalette('teal', {
        'default': '500',
        'hue-1': '900',
        'hue-2': 'A700',
        'hue-3': 'A100',
      })
      .warnPalette('red', {
        'default': '600',
        'hue-1': '900',
        'hue-2': 'A700',
        'hue-3': 'A100',
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });