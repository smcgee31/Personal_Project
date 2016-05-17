angular.module('waterfallApp')
.service('mainSvc', function($http) {

    this.login = function(credentials) {
        return $http({
            method: 'POST',
            url: '/login',
            data: credentials
        }).then(function(response) {
            return response;
        });
    };

    this.signup = function(newUser) {
        return $http({
            method: 'POST',
            url: '/signup',
            data: newUser
        }).then(function(response) {
            return response;
        });
    };

    this.getCurrentUser = function() {
        return $http({
            method: 'GET',
            url: '/me'
        }).then(function(response) {
                return response;
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

    this.addDebt = function(newDebt, id) {
        return $http({
            method: 'POST',
            url: '/api/waterfall/' + id,
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

    this.getUserDebts = function(debts) {
        return $http({
            method: 'POST', //actually acting as a GET
            url: '/api/user/waterfall',
            data: {debts: debts}
        }).then(function(response) {
            return response.data;
        });
    };




});
