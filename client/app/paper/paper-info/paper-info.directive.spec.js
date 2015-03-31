'use strict';

describe('Directive: paperInfo', function () {

  // load the directive's module and view
  beforeEach(module('smartPaperApp'));
  beforeEach(module('app/paper/paper-info/paper-info.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paper-info></paper-info>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the paperInfo directive');
  }));
});