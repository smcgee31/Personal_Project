angular.module('waterfallApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/loginUser',
        templateUrl: 'views/loginUser.html',
        controller: 'mainCtrl'
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
    })
    .state('newUser', {
        url: '/newUser',
        templateUrl: 'views/newUser.html',
        controller: 'mainCtrl'
    })
    .state('landingPage', {
        url: '/landingPage',
        templateUrl: 'views/landingPage.html',
        controller: 'mainCtrl'
    });



});
