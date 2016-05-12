angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc, $state) {

    $scope.getCurrentUser = function(){
        mainSvc.getCurrentUser()
        .then(function(response){
            console.log(response);
            $scope.user = response.data;
            console.log($scope.user);
            console.log($scope.user.displayName);
        });
    };
    $scope.getCurrentUser();



    $scope.getDebts = function() {
        mainSvc.getCurrentUser()
        .then(function(response) {
            var totalBaseArr = [];
            $scope.debts = response;
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                totalBaseArr.push(response[i].base);
            }
            $scope.totalBase = totalBaseArr.reduce(function(a, b) { return a + b; }, 0);
            $scope.getCurrentUser();
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
