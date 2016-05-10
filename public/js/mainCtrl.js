angular.module('waterfallApp')
.controller('mainCtrl', function($scope, mainSvc, $state) {

    //login function used on loginUser,
    //if response.login from the server comes back as true then we change the view to the store page
    $scope.login = function(user){ mainSvc.login(user).then(function(response){
            console.log(response);
            if(response.login) {
                mainService.getUser(response.user._id).then(function(response){
                    $scope.user = response;
                    $state.go('waterfall');
                });
            }
        });
    };


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

    $scope.commit = function(monthlyCommit) {
        $scope.waterfall = monthlyCommit - $scope.totalBase;
        return $scope.waterfall;
    };



});
