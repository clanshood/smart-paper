'use strict';

angular.module('smartPaperApp')
  .directive('menus', function ($compile, $mdConstant) {
    return {
      templateUrl: 'components/menus/menus.html',
      restrict: 'EA',
      scope: {
        items: '='
      },
      controller: 'MenusCtrl',
      link: function(scope, element, attrs){
        // register class menus
        element.addClass('menus');
        // prepare element properties
        var backdrop = $compile('<md-backdrop class="menus-backdrop md-opaque velocity-transition-fadeIn" ng-show="isOpen">')(scope),
            icon = (attrs.icon) ? '<md-icon md-font-icon="'+ attrs.icon +'" alt="'+ attrs.aria +'">' : '',
            label = (attrs.label) ? attrs.label : '',
            aria = (attrs.aria) ? attrs.aria : 'menus',
            align = (attrs.align || attrs.align !== 'left') ? 'right' : 'left';

        // set dropdown position
        element.children('.menus-dropdown').css(align, 0);

        // add btn to access menu with 'click'
        var btn = $compile('<md-button aria-label="'+ aria +'">'+ icon + label +'</md-button>')(scope),
            items = element.find('.menus-item');


        // add action to btn element
        angular.element(btn)[!scope.isOpen ? 'on' : 'off']( 'click', toggleOpen );
        // add action to backdrop element
        angular.element(backdrop)[!scope.isOpen ? 'on' : 'off']( 'click', toggleOpen );
        // ad shortcut action to element
        element[!scope.isOpen ? 'on' : 'off']( 'keydown', onKeyDown );

        /**
         * Auto-close sideNav when the `escape` key is pressed.
         * @param evt
         */
        function onKeyDown(e) {
          var isEscape = (e.keyCode === $mdConstant.KEY_CODE.ESCAPE && scope.isOpen);
          return isEscape ? toggleOpen(e) : false;
        };

        /**
         * With backdrop `clicks` or `escape` key-press, immediately
         * apply the CSS close transition... Then notify the controller
         * to close() and perform its own actions.
         */
        function toggleOpen(e){
          e.preventDefault();
          e.stopPropagation();

          scope.$apply( scope.toggleOpen );

          if(scope.isOpen){
            var x = element.children('.menus-dropdown');
            console.log(x);
          }
        }

        // add btn to menus template, always place it on first child
        element.prepend(btn);
        // add backdrop to menus template, this show when menus is open
        element.append(backdrop);
      }
    };
  });