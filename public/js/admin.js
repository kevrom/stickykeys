'use strict';

var angular = require('angular');

angular.module('admin', ['ui.router'])
	.constant('API_CONFIG', {
		API_KEY: '',
		BASE_URL: '/api/v1/',
		DB_NAME: 'shopkeeper'
	})
	.run(['$rootScope', '$state', '$stateParams',
		function($rootScope, $state, $stateParams) {
			 $rootScope.$state = $state;
			 $rootScope.$stateParams = $stateParams;
		}
	])
	.config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
		function($locationProvider, $urlRouterProvider, $stateProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');
			$urlRouterProvider.otherwise('/admin');

			$stateProvider

				// Root
				.state('root', {
					abstract: true,
					url: '/admin',
					template: '<ui-view/>'
				})

				// Home
				.state('home', {
					url: '/home',
					parent: 'root',
					template: '<div>This is the home state</div>'
				})

				// About
				.state('about', {
					url: '/about',
					parent: 'root',
					template: '<div>This is the about state</div>'
				});

		}
	]);

