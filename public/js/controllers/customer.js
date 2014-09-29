'use strict';

var CustomerCtrl = {};

/* List all customers */
CustomerCtrl.list = ['customers', '$scope', '$stateParams', function(customers, $scope, $stateParams) {
	$scope.customers = customers;
}];

module.exports = CustomerCtrl;
