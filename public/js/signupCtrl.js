angular.module('waterfallApp')
.controller('signupCtrl', function($scope, mainSvc, $state) {

    var signupMessage = { msg: 'Signup successfull' };

    $scope.signup = function(newUser) {
        mainSvc.signup(newUser)
        .then(function(response) {
            $state.go('login', signupMessage);
        });
    };



});
