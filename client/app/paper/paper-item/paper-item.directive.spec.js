'use strict';

describe('Directive: paperItem', function () {

  // load the directive's module and view
  beforeEach(module('smartPaperApp'));
  beforeEach(module('app/paper/paper-item/paper-item.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paper-item></paper-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the paperItem directive');
  }));
});