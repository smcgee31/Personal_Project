angular.module('waterfallApp')
.controller('signupCtrl', function($scope, mainSvc, $state) {


    $scope.newUser = function(user) {
        mainSvc.newUser(user)
        .then(function(response) {
            $scope.getUser();
        });
    };

    $scope.getUser = function() {
        mainSvc.getUser()
        .then(function(response) {
            $scope.user = response.data;
        });
    };



});
