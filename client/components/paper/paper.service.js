'use strict';

angular.module('smartPaperApp')
  .service('Paper', function Paper($q, $http, socketFactory, $rootScope) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      selectAll: function( scope, callback ){
        var cb = callback || angular.noop;

        $http.get( '/api/papers' ).success(function(papers){
          scope.papers = papers;

          // Update array with any new or deleted Papers pushed from the socket
          socket.on('paper:save', function(data){
            var oldData = _.find(papers, {_id: data._id});
            var index = scope.papers.indexOf(oldData);

            if (data.status === 'trash')
              scope.papers.splice(index, 1);
            else if (data.status === 'active')
              scope.papers.push(data);

            scope.papers.sort(function(a, b) {
              a = new Date(a.updated);
              b = new Date(b.updated);
              return a>b ? -1 : a<b ? 1 : 0;
            });
          });

          return cb(scope.papers);
        }).$promise;
      },
      selectPaper: function(paperId, callback){
        var cb = callback || angular.noop;

        $http.get('/api/papers/' + paperId).then(function(paper){
          return cb(paper.data);
        }, function(err){
          return cb(err);
        }).$promise;
      },
      moveTo: function( paper, target, callback ){
        var id = paper._id,
            cb = callback || angular.noop;
        $http.put('/api/papers/' + id, {status: target}).then(function(paper){
          return cb(paper.data);
        }, function(err){
          return cb(err);
        }).$promise;
      }
    };
  });
