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
					templateUrl: '/admin/partials/user_list'
				})
				.state('user.edit', {
					url: '/:id',
					parent: 'user',
					templateUrl: '/admin/partials/user_edit'
				})
				.state('user.create', {
					url: '/new',
					parent: 'user',
					templateUrl: '/admin/partials/user_edit'
				})

				// Customers
				.state('customer', {
					url: '/customers',
					parent: 'root',
					templateUrl: '/admin/partials/customer_list'
				})
				.state('customer.edit', {
					url: '/:id',
					parent: 'customer',
					templateUrl: '/admin/partials/customer_edit'
				})
				.state('customer.create', {
					url: '/new',
					parent: 'customer',
					templateUrl: '/admin/partials/customer_edit'
				})

				// Tickets
				.state('ticket', {
					url: '/tickets',
					parent: 'root',
					templateUrl: '/admin/partials/ticket_list'
				})
				.state('ticket.edit', {
					url: '/:id',
					parent: 'ticket',
					templateUrl: '/admin/partials/ticket_edit'
				})
				.state('ticket.create', {
					url: '/new',
					parent: 'ticket',
					templateUrl: '/admin/partials/ticket_edit'
				});

		}
	]);

