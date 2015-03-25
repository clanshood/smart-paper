'use strict';

angular.module('smartPaperApp')
  .controller('PaperCtrl', function ($scope, $q, $http, Auth, User, $navbar, $mdSidenav, $mdMedia, $mdDialog, $mdToast, socket, relativeDate) {
    // navbar control
    // get default navbar
    $scope.navbar = $navbar.get();
    $scope.isOpenSearch = false;

    // navbar buttons
    // required this fn if btn is defined
    $scope.btnEvent = function(action){
      if (action || action !== '') {
        $scope.$eval(action)($scope);
      };
    };
    // button lists
    $scope.navbar.buttons = [
      {
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
      }
    ];

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
      $mdSidenav('paper-info-sidenav').open();
    };
    $scope.closePaperInfo = function() {
      $mdSidenav('paper-info-sidenav').close();
    };

    // Dating
    $scope.humanDate = function(d){
      var dt;
      relativeDate.set( d, function(relativeDate) {
        dt = relativeDate;
      });
      return dt;
    };

    $scope.selectedPaper = '';
    $scope.checkedPaper = [];

    // Grab the initial set of available papers
    $http.get('/api/papers').success(function(papers) {
      $scope.papers = papers;

      // Update array with any new or deleted Papers pushed from the socket
      socket.syncUpdates('paper', $scope.papers, function(event, paper, papers) {
        // This callback is fired after the papers array is updated by the socket listeners

        // sort the array every time its modified
        papers.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    }).then(function(papers){
      $scope.selectedPaper = papers.data[0]._id;
    });


    $scope.setSelectedPaper = function(pid){
      $scope.selectedPaper = pid;
    };

    $scope.isSelected = function(pid){
      return ($scope.selectedPaper === pid);
    };

    $scope.isChecked = function(pid){
      return ($scope.checkedPaper.indexOf(pid) > -1);
    };

    $scope.checker = function(pid){
      var index = $scope.checkedPaper.indexOf(pid);
      ( $scope.isChecked(pid) ) ? $scope.checkedPaper.splice(index, 1): $scope.checkedPaper.push(pid);
    };

    $scope.getPaperInfo = function(pid){
      $scope.setSelectedPaper(pid);

      if (!$mdMedia('gt-lg')) {
        $scope.openPaperInfo();
      };
      console.log($scope.selectedPaper);

      // grab paper/:id && questions/:pid
    };


    // remove paper from database by seleted from user
    $scope.removePaper = function(scope){
      if ( !angular.isArray(scope.checkedPaper) || !scope.checkedPaper.length ) {
        return;
      }

      // create confirm for user interaction
      var confirm = $mdDialog.confirm()
        .title('Anda yakin akan menghapus paper ini?')
        .content(scope.checkedPaper.length + ' paper akan dihapus jika anda meneruskan proses ini.')
        .ariaLabel('konfirmasi penghapusan paper')
        .ok('Hapus')
        .cancel('Batalkan')

      $mdDialog.show(confirm).then(function() {
        // true
        $q.all([
          angular.forEach(scope.checkedPaper, function(pid){
            $http.delete('/api/papers/' + pid );
          })
        ])
        .then(function(){
          var pos = ($mdMedia('gt-lg')) ? 'bottom left' : 'bottom right left' ;
          var toast = $mdToast.simple()
              .content( scope.checkedPaper.length + ' paper berhasil dihapus' )
              .action('Tutup')
              .highlightAction(false)
              .position( pos );
          $mdToast.show(toast);
          // reset Paper checked
          $scope.checkedPaper = [];
        });
      }, function() {
        // false => close
        console.log('membatalkan keinginan penghapusan paper.');
      });
    };
  });
