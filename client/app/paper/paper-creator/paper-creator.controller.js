'use strict';

angular.module('smartPaperApp')
  .controller('PaperCreatorCtrl', function ($scope, $navbar, $mdSidenav, $mdDialog) {
    $scope.navbar = $navbar.set({
      isSidenavControll: false,
      isSearchBtn: false,
      isBackBtn: true,
      brand: 'Kembali'
    });

    // app search actions
    $scope.openSearch = function() {
      $scope.isOpenSearch = true;
    };
    $scope.closeSearch = function() {
      $scope.isOpenSearch = false;
    };
    // end of navbar controll

    // sidebar control
    $scope.toggleSidenav = function() {
      $mdSidenav('app-sidenav').toggle();
    };
    // end of sidebar control


    // setups form
    var qustionsDraft = [],
        newQuestion = {},
        paperDraft = [];

    $scope.showQuestionForm = function(ev) {
      $mdDialog.show({
        controller: QuestionFormCtrl,
        templateUrl: 'app/paper/paper-creator/paper-question.html',
        targetEvent: ev,
      })
      .then(function(answer) {
        console.log('You said the information was "' + answer + '".');
      }, function() {
        console.log('You cancelled the dialog.');
      });
    };

    $scope.addNewQuestion = function(){
      // menambahkan pertanyaan baru
    };

    $scope.addExsQuestion = function(){
      // menambahkan dari gudang pertanyaan
    };

    $scope.removeQuestion = function(){
    };

    $scope.duplicateQuestion = function(){
    };

    $scope.savePaper = function(){
    };

  });

function QuestionFormCtrl($scope, $mdDialog){
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}