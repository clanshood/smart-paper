'use strict';

describe('Directive: paperCreator', function () {

  // load the directive's module
  beforeEach(module('smartPaperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paper-creator></paper-creator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the paperCreator directive');
  }));
});