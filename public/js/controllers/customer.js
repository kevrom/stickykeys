'use strict';

var CustomerCtrl = {};

/* List all customers */
CustomerCtrl.list = ['Customer', '$scope', '$stateParams', function(Customer, $scope, $stateParams) {
	var getCustomers = function() {
		Customer.findAll(function(customers) {
			$scope.customers = customers;
		}, function(err) {
			console.log(err);
		});
	};

	var init = function() {
		getCustomers();
	};

	init();
}];

module.exports = CustomerCtrl;
