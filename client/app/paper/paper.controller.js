'use strict';

angular.module('smartPaperApp')
  .controller('PaperCtrl', function ($scope, $q, $timeout, $http, Auth, User, Paper, $navbar, $mdSidenav, $mdMedia, $mdDialog, $mdToast, socket) {
    // navbar control
    // get default navbar
    $scope.navbar = $navbar.set({
      buttons: [{
        label: '<i class="flaticon flaticon-md flaticon-create3"></i>',
        tooltip: 'Ubah',
        needAuth: Auth.isLoggedIn() && Auth.isAdmin(),
        link: '/#',
        action: {
          ngClick: 'editPaper',
          ngClass: "{'velocity-transition-fadeIn': checkedPaper.length}",
          ngShow: 'checkedPaper.length === 1',
          ngHide: true // set default hide
        }
      }, {
        label: '<i class="flaticon flaticon-md flaticon-rubbish"></i>',
        tooltip: 'Hapus',
        needAuth: Auth.isLoggedIn() && Auth.isAdmin(),
        link: '/#',
        action: {
          ngClick: 'removePaper',
          ngClass: "{'velocity-transition-fadeIn': checkedPaper.length}",
          ngShow: 'checkedPaper.length',
          ngHide: '!checkedPaper.length' // set default hide
        }
      }]
    });

    $scope.isOpenSearch = false;

    // empty content handle
    $scope.empty = {
      icon: 'flaticon flaticon-cloud304',
      label: 'Anda Tidak Memiliki Satupun Paper',
      description: 'Paper yang anda buat akan berada disini dan anda belum punya saat ini.'
    };

    // navbar buttons
    // required this fn if btn is defined
    $scope.btnEvent = function(action){
      if (action || action !== '') {
        $scope.$eval(action)($scope);
      };
    };

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


    // content control
    // content sidebar
    $scope.openPaperInfo = function() {
      // wait until ripple animate finish
      $timeout(function(){
        $mdSidenav('paper-info-sidenav').open();
      }, 300);
    };
    $scope.closePaperInfo = function() {
      $mdSidenav('paper-info-sidenav').close();
    };

    // paper items actions
    $scope.selectedPaper = null;
    $scope.checkedPaper = [];

    /**
     * set paper that selected by user
     *
     * @param {Object} paper
     */
    $scope.setSelectedPaper = function(paper){
      $scope.selectedPaper = paper;
    };

    /**
     * check if paper was selected or not then toggle it
     *
     * @param  {String}  pid
     * @return {Boolean}
     */
    $scope.isSelected = function(pid){
      return ($scope.selectedPaper._id === pid);
    };

    $scope.isChecked = function(pid){
      var ids = [];
      angular.forEach( $scope.checkedPaper, function(val){
        ids.push(val._id);
      });
      return (ids.indexOf(pid) > -1);
    };

    $scope.checker = function(paper){

      var index = $scope.checkedPaper.indexOf(paper);
      ( $scope.isChecked(paper._id) ) ? $scope.checkedPaper.splice(index, 1): $scope.checkedPaper.push(paper);
    };


    $scope.getPaperInfo = function(paper){
      $scope.setSelectedPaper(paper);

      if (!$mdMedia('gt-lg')) {
        $scope.openPaperInfo();
      };
      // console.log($scope.selectedPaper);

      // grab paper/:id && questions/:pid
    };

    // Grab the initial set of available papers
    Paper.selectAll($scope, function(papers){
      if (papers.length)
        $scope.setSelectedPaper(papers[0]);
    });

    // remove (mean move paper to trash until user cleaning the trash) paper from database by seleted from user
    $scope.removePaper = function($scope){
      if ( !angular.isArray($scope.checkedPaper) || !$scope.checkedPaper.length ) {
        return;
      }

      // create confirm for user interaction
      var confirm = $mdDialog.confirm()
        .title('Anda yakin akan menghapus paper?')
        .content($scope.checkedPaper.length + ' paper akan dihapus jika anda meneruskan proses ini.')
        .ariaLabel('konfirmasi penghapusan paper')
        .ok('Hapus')
        .cancel('Batalkan')

      $mdDialog.show(confirm).then(function() {
        var beCancel = $scope.checkedPaper;
        // true
        $q.all([
          angular.forEach($scope.checkedPaper, function(paper){
            Paper.moveTo( paper, 'trash', function(data){
              if( angular.equals(paper, $scope.selectedPaper) && $scope.papers.length )
                $scope.setSelectedPaper($scope.papers[0]);
            });
          })
        ])
        .then(function(){

          // show alert
          var pos = ($mdMedia('gt-lg')) ? 'bottom left' : 'bottom right left' ;
          var toast = $mdToast.simple()
              .content( $scope.checkedPaper.length + ' paper berhasil dihapus' )
              .action('Kembalikan')
              .highlightAction(false)
              .position( pos )
              .hideDelay(6000);
          $mdToast.show(toast).then(function(){
            angular.forEach(beCancel, function(paper){
              Paper.moveTo( paper, 'active', function(){
                if( angular.equals(paper, $scope.selectedPaper) && $scope.papers.length )
                  $scope.setSelectedPaper($scope.papers[0]);
              });
            });
          }); // end $mdToast

          $scope.checkedPaper = [];
        });
      }, function() {
        // false => close
        console.log('membatalkan keinginan penghapusan paper.');
      }); // end $mdDialog
    };

    // update papers on data change
    // socket.socket.on('paper:remove', function (doc) {
    //   //
    //   console.log(doc);
    // });
    // $scope.$on('paper:moveto', function (data) {
    //   socket.unsyncUpdates('paper');
    // });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('paper');
    });
  });
