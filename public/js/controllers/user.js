'use strict';

var UserCtrl = {};

/* List all users */
UserCtrl.list = ['users', '$scope', '$stateParams', function(users, $scope, $stateParams) {
	$scope.users = users;
}];

module.exports = UserCtrl;
