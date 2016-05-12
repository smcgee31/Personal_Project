angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc, $state, user) {

    $scope.user = user.data;
    $scope.debts = user.data.debts;

    $scope.commit = function(monthlyCommit) {
        $scope.waterfall = monthlyCommit - $scope.totalBase;
        return $scope.waterfall;
    };

    $scope.getBaseTotal = function() {
        var totalBaseArr = [];
        var debts = $scope.user.debts;
        for (var i = 0; i < debts.length; i++) {
            totalBaseArr.push(debts[i].base);
        }
        $scope.totalBase = totalBaseArr.reduce(function(a, b) { return a + b; }, 0);
        if ($scope.user.monthlyCommit) {
            $scope.commit($scope.user.monthlyCommit);
        }
    };$scope.getBaseTotal();

    $scope.refreshUser = function() {
        mainSvc.getCurrentUser()
        .then(function(response) {
            $scope.user = response.data;
            $scope.debts = response.data.debts;
            $scope.getBaseTotal();
        });
    };

    $scope.newDebt = {};

    $scope.addDebt = function(newDebt) {
        mainSvc.addDebt(newDebt)
        .then(function(response) {
            $scope.newDebt = {};
            $scope.refreshUser();
        });
    };

    $scope.deleteDebt = function(debt) {
        mainSvc.deleteDebt(debt)
        .then(function(response) {
            $scope.refreshUser();
        });
    };


    $scope.updateUser = function(monthlyCommit) {
        mainSvc.updateUser($scope.user._id, {monthlyCommit: monthlyCommit})
        .then(function(response) {
            $scope.refreshUser();
        });
    };

    $scope.pay
    //(balance + (balance * (rate/12))) - base

    // $scope.payAll = function() {
        // take the base pmt and subtract it from the balance
        // and also add the waterfall amount to the first debt's base for the subtraction
        // $scope.
    // };



});
