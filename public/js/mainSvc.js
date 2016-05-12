angular.module('waterfallApp')
.service('mainSvc', function($http) {

    this.getCurrentUser = function() {
        return $http({
            method: 'GET',
            url: '/me'
        }).then(function(response) {
            return $http({
                method: 'POST',
                url: '/api/user',
                data: response.data
            })
            .then(function(response) {
                return response;
            });
        });
    };

    this.getUser = function() {
        return $http({
            method: 'GET',
            url: '/api/user'
        }).then(function(response) {
            return response.data;
        });
    };

    this.updateUser = function(id, newUserData) {
        return $http({
            method: 'PUT',
            url: '/api/user/' + id,
            data: newUserData
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
