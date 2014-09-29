'use strict';

var CustomerCtrl = {};

/* List all customers */
CustomerCtrl.list = ['customers', '$scope', '$stateParams', function(customers, $scope, $stateParams) {
	$scope.customers = customers;
}];

CustomerCtrl.edit = ['customer', '$scope', '$stateParams', function(customer, $scope, $stateParams) {
	$scope.customer = customer;
}];

module.exports = CustomerCtrl;
