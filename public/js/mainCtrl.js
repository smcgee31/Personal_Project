angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc, $state, user) {

    $scope.user = user.data;

    $scope.getCurrentUser = function(){
        mainSvc.getCurrentUser()
        .then(function(response){
            $scope.user = response.data;
        });
    };

    $scope.getDebts = function() {
        mainSvc.getCurrentUser()
        .then(function(response) {
            var totalBaseArr = [];
            var debts = response.data.debts;
            for (var i = 0; i < debts.length; i++) {
                totalBaseArr.push(debts[i].base);
            }
            $scope.totalBase = totalBaseArr.reduce(function(a, b) { return a + b; }, 0);
            $scope.getCurrentUser();
        });
    };

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

    $scope.commit = function(monthlyCommit) {
        $scope.waterfall = monthlyCommit - $scope.totalBase;
        return $scope.waterfall;
    };



});
