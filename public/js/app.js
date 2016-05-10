angular.module('waterfallApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
    })
    .state('waterfall', {
        url: '/waterfall',
        templateUrl: 'views/waterfall.html',
        controller: 'mainCtrl'
    })
    .state('loginError', {
        url: '/loginError',
        templateUrl: 'views/loginError.html',
        controller: 'loginErrorCtrl'
    });



});
