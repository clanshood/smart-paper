'use strict';

describe('Directive: menus', function () {

  // load the directive's module and view
  beforeEach(module('smartPaperApp'));
  beforeEach(module('components/menus/menus.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<menus></menus>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the menus directive');
  }));
});