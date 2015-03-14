'use strict';

angular.module('smartPaperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('paper', {
        url: '/',
        templateUrl: 'app/paper/paper.html',
        controller: 'PaperCtrl'
      });
  });