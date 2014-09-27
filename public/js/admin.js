'use strict';

var angular = require('angular');
require('./services/admin-resources');
require('./controllers');

angular.module('admin', ['ui.router', 'admin.resources', 'admin.controllers'])
	.constant('API_CONFIG', {
		API_KEY: '',
		BASE_URL: '/admin/api/v1/'
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

				// Users
				.state('user', {
					url: '/users',
					parent: 'root',
					template: '<div>This is the user state</div>'
				})

				// Customers
				.state('customer', {
					url: '/customers',
					parent: 'root',
					template: '<div>This is the customer state</div>'
				})

				// Tickets
				.state('ticket', {
					url: '/tickets',
					parent: 'root',
					template: '<div>This is the ticket state</div>'
				});

		}
	]);

