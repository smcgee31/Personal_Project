angular.module('waterfallApp')
.controller('userCtrl', function($scope, mainSvc, $state) {


    $scope.newUser = function(user) {
        mainSvc.newUser(user)
        .then(function(response) {
            console.log(response.data);
            $scope.getUser();
        });
    };

    $scope.getUser = function() {
        mainSvc.getUser()
        .then(function(response) {
            $scope.user = response.data;
        });
    };

    $scope.commit = function(monthlyCommit) {
        $scope.waterfall = monthlyCommit - $scope.totalBase;
        return $scope.waterfall;
    };


});
