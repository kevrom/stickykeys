'use strict';


var angular = require('angular');

angular.module('admin.resources', ['restangular'])
	.constant('API_CONFIG', {
		API_KEY: '',
		BASE_URL: '/admin/api/v1/'
	})
	.config(['API_CONFIG', 'RestangularProvider', function(API_CONFIG, RestangularProvider) {
		var config = API_CONFIG;
		RestangularProvider.setBaseUrl(config.BASE_URL);
	}])
	.factory('Users', ['Restangular', function(Restangular) {
		return Restangular.service('users');
	}])
	.factory('Customers', ['Restangular', function(Restangular) {
		return Restangular.service('customers');
	}])
	.factory('Tickets', ['Restangular', function(Restangular) {
		return Restangular.service('tickets');
	}]);
