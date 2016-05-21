angular.module('waterfallApp')
.controller('loginCtrl', function($scope, mainSvc, $state) {

    // $scope.signupMessage = $stateParams;

    $scope.login = function(credentials) {
        mainSvc.login(credentials)
        .then(function(response) {
            $state.go('waterfall');
        });
    };



});
