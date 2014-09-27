'use strict';

var UserCtrl = {};

/* List all users */
UserCtrl.list = ['User', '$scope', '$stateParams', function(User, $scope, $stateParams) {
	var getUsers = function() {
		User.findAll(function(users) {
			$scope.users = users;
		}, function(err) {
			console.log(err);
		});
	};

	var init = function() {
		getUsers();
	};

	init();
}];

module.exports = UserCtrl;
