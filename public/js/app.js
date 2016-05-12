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
        controller: 'mainCtrl',
        resolve: {
            user: function(mainSvc) {
                return mainSvc.getCurrentUser();
            }
        }
    })
    .state('loginError', {
        url: '/loginError',
        templateUrl: 'views/loginError.html',
        controller: 'loginErrorCtrl'
    })
    .state('user', {
        url: '/user',
        templateUrl: 'views/user.html',
        controller: 'userCtrl'
    })
    .state('landingPage', {
        url: '/landingPage',
        templateUrl: 'views/landingPage.html',
        controller: 'mainCtrl',
        resolve: {
            user: function() {
                return {};
            }
        }
    });



});
