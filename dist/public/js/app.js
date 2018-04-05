(function () {
    'use strict';
    angular.module('shareMarketAppModule', [
        'ui.router',
        'ui-notification',
        'ui.bootstrap',
    ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'NOTIFICATION_CONSTANT', 'NotificationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, NOTIFICATION_CONSTANT, NotificationProvider) {
            NotificationProvider.setOptions(NOTIFICATION_CONSTANT);
            $locationProvider.hashPrefix('');
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "views/login.html",
                    controller: 'loginController',
                    controllerAs: 'loginCtrl',
                    resolve: {
                        checkAuth: ['commonMethodService', '$state', 'NODE_WEB_API', function (commonMethodService, $state, NODE_WEB_API) {
                            commonMethodService.currentUser = null;
                            return commonMethodService.serverRequest(NODE_WEB_API.GET_LOGIN, 'GET', null, true, 'Check Authentication..')
                                .then(function (result) {
                                    commonMethodService.currentUser = result.user;
                                    $state.go('list_view');
                                }, function (error) {
                                    commonMethodService.currentUser = null;
                                });
                        }]
                    }

                })
                .state('signup', {
                    url: "/signup",
                    templateUrl: "views/signup.html",
                    controller: 'signupController',
                    controllerAs: 'signupCtrl',
                    resolve: {
                        checkAuth: ['commonMethodService', '$state', 'NODE_WEB_API', function (commonMethodService, $state, NODE_WEB_API) {
                            commonMethodService.currentUser = null;
                            return commonMethodService.serverRequest(NODE_WEB_API.GET_LOGIN, 'GET', null, true, 'Check Authentication..')
                                .then(function (result) {
                                    commonMethodService.currentUser = result.user;
                                    $state.go('list_view');
                                }, function (error) {
                                    commonMethodService.currentUser = null;
                                });
                        }]
                    }
                })
                .state('list_view', {
                    url: "/list_view",
                    templateUrl: "views/list_view.html",
                    controller: 'listViewController',
                    controllerAs: 'listViewCtrl',
                    resolve: {
                        checkAuth: ['commonMethodService', '$state', 'NODE_WEB_API', function (commonMethodService, $state, NODE_WEB_API) {
                            commonMethodService.currentUser = null;
                            return commonMethodService.serverRequest(NODE_WEB_API.GET_LOGIN, 'GET', null, true, 'Check Authentication..')
                                .then(function (result) {
                                    commonMethodService.currentUser = result.user;
                                }, function (error) {
                                    commonMethodService.currentUser = null;
                                    $state.go('list_view');
                                });
                        }]
                    }
                });
            $urlRouterProvider.otherwise("/login");
        }]);
})();