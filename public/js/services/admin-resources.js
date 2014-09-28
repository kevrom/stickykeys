'use strict';


var angular = require('angular');
require('./api-resource');

angular.module('admin.resources', ['API.resource', 'restangular'])
	.factory('User', ['RestangularResource', function(Rest) {
		return new Rest('users');
	}])
	.factory('Customer', ['RestangularResource', function(Rest) {
		return new Rest('customers');
	}])
	.factory('Ticket', ['RestangularResource', function(Rest) {
		return new Rest('tickets');
	}]);
