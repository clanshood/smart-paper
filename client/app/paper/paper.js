'use strict';

angular.module('smartPaperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('paper', {
        url: '/',
        templateUrl: 'app/paper/paper.html',
        controller: 'PaperCtrl',
        authenticate: true
      })
      .state('paperCreator', {
        url: '/paper/baru',
        templateUrl: 'app/paper/paper-creator/paper-creator.html',
        controller: 'PaperCreatorCtrl',
        authenticate: true
      });
  });