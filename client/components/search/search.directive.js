'use strict';

angular.module('smartPaperApp')
  .directive('search', function ($compile, $mdConstant) {
    return {
      templateUrl: 'components/search/search.html',
      restrict: 'EA',
      controller: 'SearchCtrl',
      controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
        var body = document.querySelectorAll('body'),
            backdrop = $compile('<md-backdrop class="search-backdrop md-opaque" ng-click="closeSearch()" ng-if="isOpenSearch">')(scope);

        element.addClass('app-search');
        element.attr('tabIndex', '-1');
        element.focus();
        angular.element(backdrop);
        // add backdrop to document body
        angular.element(body).append(backdrop);
        // element.prepend(backdrop);

       /**
         * Auto-close sideNav when the `escape` key is pressed.
         * @param evt
         */
        function onKeyDown(e) {
          var isEscape = (e.keyCode === $mdConstant.KEY_CODE.ESCAPE);
          console.log(e.keyCode);
          scope.isOpenSearch = (isEscape) ? true : false;
        }

        element[scope.isOpenSearch ? 'on' : 'off']( 'keydown', onKeyDown );
      }
    };
  });