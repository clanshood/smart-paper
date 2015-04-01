'use strict';

describe('Controller: PaperCreatorCtrl', function () {

  // load the controller's module
  beforeEach(module('smartPaperApp'));

  var PaperCreatorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaperCreatorCtrl = $controller('PaperCreatorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
