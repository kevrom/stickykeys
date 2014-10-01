'use strict';

var angular = require('angular');
require('./controllers');
require('./services');

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

				// Users
				.state('users', {
					url: '/admin/users',
					views: {
						'@': {
							templateUrl: '/admin/partials/user_list',
							controller: 'UserListCtrl'
						}
					},
					resolve: {
						users: ['Users', function(Users) {
							return Users.getList().$object;
						}]
					}
				})
				.state('users.create', {
					url: '/new',
					parent: 'users',
					views: {
						'@': {
							templateUrl: '/admin/partials/user_edit',
							controller: 'UserEditCtrl'
						}
					},
					resolve: {
						user: ['Restangular', function(Restangular) {
							return Restangular.restangularizeElement(null, {}, 'users');
						}]
					}
				})
				.state('users.edit', {
					url: '/:userId',
					parent: 'users',
					views: {
						'@': {
							templateUrl: '/admin/partials/user_edit',
							controller: 'UserEditCtrl'
						}
					},
					resolve: {
						user: ['Users', '$stateParams', function(Users, $stateParams) {
							return Users.one($stateParams.userId).get();
						}]
					}
				})

				// Customers
				.state('customers', {
					url: '/admin/customers',
					views: {
						'@': {
							templateUrl: '/admin/partials/customer_list',
							controller: 'CustomerListCtrl'
						}
					},
					resolve: {
						customers: ['Customers', function(Customers) {
							return Customers.getList().$object;
						}]
					}
				})
				.state('customers.create', {
					url: '/new',
					parent: 'customers',
					views: {
						'@': {
							templateUrl: '/admin/partials/customer_edit',
							controller: 'CustomerEditCtrl'
						}
					},
					resolve: {
						customer: ['Restangular', function(Restangular) {
							return Restangular.restangularizeElement(null, {}, 'customers');
						}]
					}
				})
				.state('customers.view', {
					url: '/:customerId',
					parent: 'customers',
					views: {
						'@': {
							templateUrl: '/admin/partials/customer_view',
							controller: 'CustomerEditCtrl'
						}
					},
					resolve: {
						customer: ['Customers', '$stateParams', function(Customers, $stateParams) {
							return Customers.one($stateParams.customerId).get();
						}]
					}
				})
				.state('customers.view.edit', {
					url: '/edit',
					parent: 'customers.view',
					views: {
						'@': {
							templateUrl: '/admin/partials/customer_edit',
							controller: 'CustomerEditCtrl'
						}
					}
				})

				// Tickets
				.state('tickets', {
					url: '/admin/tickets',
					views: {
						'@': {
							templateUrl: '/admin/partials/ticket_list',
							controller: 'TicketListCtrl'
						}
					},
					resolve: {
						tickets: ['Tickets', function(Tickets) {
							return Tickets.getList().$object;
						}]
					}
				})
				.state('tickets.create', {
					url: '/new',
					parent: 'tickets',
					views: {
						'@': {
							templateUrl: '/admin/partials/ticket_edit',
							controller: 'TicketEditCtrl'
						}
					},
					resolve: {
						ticket: ['Restangular', function(Restangular) {
							return Restangular.restangularizeElement(null, {}, 'tickets');
						}]
					}
				})
				.state('tickets.edit', {
					url: '/:ticketId',
					parent: 'tickets',
					views: {
						'@': {
							templateUrl: '/admin/partials/ticket_edit',
							controller: 'TicketEditCtrl'
						}
					},
					resolve: {
						ticket: ['Tickets', '$stateParams', function(Tickets, $stateParams) {
							Tickets.one($stateParams.ticketId).get();
						}]
					}
				});

		}
	]);

