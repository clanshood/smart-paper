'use strict';

angular.module('smartPaperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('paper', {
        url: '/paper',
        templateUrl: 'app/paper/paper.html',
        controller: 'PaperCtrl'
      })
        .state('paper.details', {
          url: '/terpilih/:paperId',
          views: {
            'paperItem' : {
              templateUrl: 'app/paper/paper.item.html',
              controller: function($scope, $state){
                var paperId = $state.params.paperId;

                $scope.selectPaper(paperId).then(function(paper){
                  $scope.paper = paper;
                });
              }
            }
          }
        })

      .state('paperCreator', {
        url: '/paper/baru',
        parent: 'paper',
        templateUrl: '/paper-creator/paper-creator.html',
        controller: 'PaperCreatorCtrl'
        // authenticate: true
      });
  });