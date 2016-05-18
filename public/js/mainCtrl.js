angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc, mathSvc, $state, user) {

    $scope.user = user.data;
    $scope.debts = user.data.debts;
    console.log($scope.debts);

    $scope.predicate = '+balance';

    $scope.commit = function(monthlyCommit) {
        $scope.waterfall = monthlyCommit - $scope.totalBase;
        return $scope.waterfall;
    };

    $scope.getBaseTotal = function() {
        var totalBaseArr = [];
        var debts = $scope.debts;
        for (var i = 0; i < debts.length; i++) {
            totalBaseArr.push(debts[i].base);
        }
        $scope.totalBase = totalBaseArr.reduce(function(a, b) { return a + b; }, 0);
        if ($scope.user.monthlyCommit) {
            $scope.commit($scope.user.monthlyCommit);
        }
    };
    $scope.getBaseTotal();

    $scope.refreshUser = function() {
        mainSvc.getCurrentUser()
        .then(function(response) {
            $scope.user = response.data;
            $scope.debts = response.data.debts;
            $scope.getUserDebts($scope.debts);
        });
    };

    $scope.getUserDebts = function(debts) {
        mainSvc.getUserDebts(debts)
        .then(function(response) {
            $scope.debts = response;
            $scope.getBaseTotal();
        });

    };

    $scope.getUserDebts($scope.user.debts);
    $scope.newDebt = {};

    $scope.addDebt = function(newDebt) {
        mainSvc.addDebt(newDebt, $scope.user._id)
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

    $scope.logout = function() {
        mainSvc.logout()
        .then(function(response) {
            $state.go('login');
        });
    };

    $scope.payTheBills = function(waterfall, debts, type) {
        if (type === 'balance') {
            $scope.sorter='+balance';
        } else {
            $scope.sorter='-rate';
        }
        $scope.refreshUser();
        $scope.newDebts = function(waterfall, debts, type) {
            mathSvc.payTheBills(waterfall, debts, type)
            .then(function(response) {
                $scope.newDebts = response.data;
                console.log($scope.newDebts.data);
            });
        };

        // .then(function(response) {
        //     // var newDebtsArray = response;
        //     console.log(response);
        // });
    };


});
