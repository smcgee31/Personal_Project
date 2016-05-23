angular.module('waterfallApp')
.directive('headerDir', function() {

    return {
        templateUrl: 'views/header.html',
        restrict: 'AE',
        controller: function($scope, $location, mainSvc) {
            
            $scope.location = $location;

            $scope.logout = function() {
                mainSvc.logout()
                    .then(function(response) {
                        $state.go('home');
                    });
            };

        }
    };

});
