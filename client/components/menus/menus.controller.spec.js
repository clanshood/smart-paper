'use strict';

describe('Controller: MenusCtrl', function () {

  // load the controller's module
  beforeEach(module('smartPaperApp'));

  var MenusCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MenusCtrl = $controller('MenusCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
