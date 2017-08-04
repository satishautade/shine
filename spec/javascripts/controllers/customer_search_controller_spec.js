describe("Test Angular Controller", function () {
    describe("Initialization CustomerSearchController", function () {
        // Declare variables so that they are accessible globally within test
        var scope = null, controller = null;
        // Load Angular App (DOES NOT START IT)
        beforeEach(module('customers'))
        // Use inject to Mock the call to Angular controller with rootScope (angular like scope)
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Call the controller using inject method and pass scope
            controller = $controller("CustomerSearchController", {
                $scope: scope
            });
        }));

        it("Defaults to an empty customer list", function () {
            expect(scope.customers).toEqualData([]);
        });
    });

});