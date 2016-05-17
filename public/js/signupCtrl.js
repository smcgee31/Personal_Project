angular.module('waterfallApp')
.controller('signupCtrl', function($scope, mainSvc, $state) {

    $scope.signup = function(newUser) {
        mainSvc.signup(newUser)
        .then(function(response) {
          $state.go('waterfall');
        });
    };



});
