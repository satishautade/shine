var app = angular.module('customers', []);

// var CustomerSearchController = function($scope){
//     $scope.search = function(searchTerm){
//         $scope.searchedFor = searchTerm;
//     }
// };

app.controller("CustomerSearchController",
    ["$scope", "$http",
        function ($scope, $http) {
            var page = 0;
            $scope.customers = [];
            // search function defined in the passed Angular Scope, requires a searchTerm param
            $scope.search = function (searchTerm) {
                // Do not invoke if Search term is too short
                if(searchTerm.length < 3){
                    return;
                }
                // Fire an AJAX request to Server (CustomersController class), asking JSON response
                $http.get("/customers.json", {"params": {"keywords": searchTerm, "page": page}}).
                then(
                    // Success Function
                    function (response) {
                        $scope.customers = response.data;
                    },
                    // Failure Function
                    function (response) {
                        alert("There was a problem: " + response.status)
                    }
                );
            }

            $scope.previousPage = function(){
                if(page > 0){
                    page = page - 1;
                }
                $scope.search($scope.keywords)
            }

            $scope.nextPage = function(){
                page = page + 1;
                $scope.search($scope.keywords)
            }
        }
    ]);