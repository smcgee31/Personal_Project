angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc) {
    // $scope.test = 'Test line for waterfall.html';

    $scope.getDebts = function() {
        mainSvc.getDebts()
        .then(function(response) {
            var totalBaseArr = [];
            $scope.debts = response;
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                totalBaseArr.push(response[i].base);
            }
            $scope.totalBase = totalBaseArr.reduce(function(a, b) { return a + b; }, 0);
        });
    };

    $scope.getDebts();
    $scope.newDebt = {};


    $scope.addDebt = function(newDebt) {
        mainSvc.addDebt(newDebt)
        .then(function(response) {
            $scope.newDebt = {};
            $scope.getDebts();
        });
    };

    $scope.deleteDebt = function(debt) {
        mainSvc.deleteDebt(debt)
        .then(function(response) {
            $scope.getDebts();
        });
    };




});
