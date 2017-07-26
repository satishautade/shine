var app = angular.module('customers', []);

// var CustomerSearchController = function($scope){
//     $scope.search = function(searchTerm){
//         $scope.searchedFor = searchTerm;
//     }
// };

app.controller("CustomerSearchController",
    ["$scope", "$http",
        function ($scope, $http) {
            $scope.customers = [];
            // search function defined in the passed Angular Scope, requires a searchTerm param
            $scope.search = function (searchTerm) {
                // Display the Search term on the page
                $scope.searchedFor = searchTerm;
                // Fire an AJAX request to Server (CustomersController class), asking JSON response
                $http.get("/customers.json", {"params": {"keywords": searchTerm}}).
                then(
                    // Success Function
                    function (response) {
                        $scope.customers = response.data;
                    },
                    // Failure Function
                    function (response) {
                        alert("There was a problem" + response.status)
                    }
                );
            }
        }
    ]);