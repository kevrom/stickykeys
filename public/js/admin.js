'use strict';

var angular = require('angular');
require('./services/admin-resources');
require('./controllers');

angular.module('admin', ['ui.router', 'admin.resources', 'admin.controllers'])
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
				.state('users', {
					url: '/users',
					parent: 'root',
					templateUrl: '/admin/partials/user_list',
					resolve: {
						users: ['Users', function(Users) {
							return Users.getList().$object;
						}]
					}
				})
				.state('users.edit', {
					url: '/:id',
					parent: 'users',
					templateUrl: '/admin/partials/user_edit'
				})
				.state('users.create', {
					url: '/new',
					parent: 'users',
					templateUrl: '/admin/partials/user_edit'
				})

				// Customers
				.state('customers', {
					url: '/customers',
					parent: 'root',
					templateUrl: '/admin/partials/customer_list',
					resolve: {
						customers: ['Customers', function(Customers) {
							return Customers.getList().$object;
						}]
					}
				})
				.state('customers.edit', {
					url: '/:id',
					parent: 'customers',
					templateUrl: '/admin/partials/customer_edit'
				})
				.state('customers.create', {
					url: '/new',
					parent: 'customers',
					templateUrl: '/admin/partials/customer_edit'
				})

				// Tickets
				.state('tickets', {
					url: '/tickets',
					parent: 'root',
					templateUrl: '/admin/partials/ticket_list',
					resolve: {
						tickets: ['Tickets', function(Tickets) {
							return Tickets.getList().$object;
						}]
					}
				})
				.state('tickets.edit', {
					url: '/:id',
					parent: 'tickets',
					templateUrl: '/admin/partials/ticket_edit'
				})
				.state('tickets.create', {
					url: '/new',
					parent: 'tickets',
					templateUrl: '/admin/partials/ticket_edit'
				});

		}
	]);

