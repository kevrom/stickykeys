'use strict';


var angular = require('angular');
require('./api-resource');

angular.module('admin.resources', ['API.resource', 'restangular'])
	.factory('Ticket', ['RestangularResource', function(Rest) {
		return new Rest('tickets');
	}]);
