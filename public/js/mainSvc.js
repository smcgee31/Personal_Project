angular.module('waterfallApp')
.service('mainSvc', function($http) {

    this.getDebts = function() {
        return $http({
            method: 'GET',
            url: '/api/waterfall'
        }).then(function(response) {
            return response.data;
        });
    };

    this.addDebt = function(newDebt) {
        return $http({
            method: 'POST',
            url: '/api/waterfall',
            data: newDebt
        }).then(function(response) {
            return response.data;
        });
    };

    this.deleteDebt = function(debt) {
        return $http({
            method: 'DELETE',
            url: '/api/waterfall/' + debt._id
        }).then(function(response) {
            return response.data;
        });
    };


});
