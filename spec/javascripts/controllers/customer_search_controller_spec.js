describe("Test Angular Controller", function () {
    describe("Initialization CustomerSearchController", function () {
        // Declare variables so that they are accessible globally within test
        var scope = null,
            controller = null,
            httpBackend = null,
            cannedCustomersResponse = [
                {
                    id: 123,
                    first_name: "Bob",
                    last_name: "Jones",
                    email: "bjones@foo.net",
                    username: "jonesy"
                },
                {
                    id: 456,
                    first_name: "Bob",
                    last_name: "Johnson",
                    email: "johnboy@bar.info",
                    username: "bobbyj"
                }
            ];

        // Mind the sequence of below code
        // Step 1: Load Angular App (DOES NOT START IT)
        beforeEach(module('customers'));

        // Step 2: Use inject to Mock the call to Angular controller with rootScope (angular like scope)
        beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            // Call the controller using inject method and pass scope
            controller = $controller("CustomerSearchController", {
                $scope: scope
            });
        }));

        // Step 3: Configure HTTP backend to mock the request and response to server
        beforeEach(function () {
           httpBackend.when('GET', '/customers.json?keywords=bob&page=0').
           respond(cannedCustomersResponse);
        });

        //TEST CASES

        it("Defaults to an empty customer list", function () {
            expect(scope.customers).toEqualData([]);
        });

        it("populates the customer with list of results", function () {
            scope.search("bob");
            httpBackend.flush();
            expect(scope.customers).toEqualData(cannedCustomersResponse);
        });
    });
    
    describe("Error Handling", function () {
        var scope = null,
            controller = null,
            httpBackend = null;

        beforeEach(module('customers'));
        beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            // Call the controller using inject method and pass scope
            controller = $controller("CustomerSearchController", {
                $scope: scope
            });
        }));
        beforeEach(function () {
            httpBackend.when('GET', '/customers.json?keywords=bob&page=0').
            respond(500, 'Internal Server Error');
            spyOn(window, "alert");
        });

        it("Alerts the user on error", function () {
            scope.search("bob");
            httpBackend.flush();
            expect(scope.customers).toEqualData([]);
            expect(window.alert).toHaveBeenCalledWith("There was a problem: 500");
        });
    });

});