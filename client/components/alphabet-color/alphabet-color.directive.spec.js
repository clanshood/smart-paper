'use strict';

describe('Directive: alphabetColor', function () {

  // load the directive's module and view
  beforeEach(module('smartPaperApp'));
  beforeEach(module('components/alphabet-color/alphabet-color.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<alphabet-color></alphabet-color>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the alphabetColor directive');
  }));
});