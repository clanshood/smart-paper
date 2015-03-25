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
  'ngMaterial',
  'relativeDate'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider, relativeDateProvider) {
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

    relativeDateProvider.cutoffDayCount(15);
    relativeDateProvider.defaultFallbackFormat("MMM d, yyyy");
    relativeDateProvider.translations({
      JUST_NOW: "baru saja",
      ABOUT_1_MINUTE_AGO: "1 menit lalu",
      MINUTES_AGO: "menit lalu",
      ABOUT_1_HOUR_AGO: "sekitar 1 jam",
      HOURS_AGO: "jam lalu",
      YESTERDAY: "kemarin",
      DAYS_AGO: "hari lalu",
      A_WEEK_AGO: "seminggu lalu",
      WEEKS_AGO: "minggu lalu"
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