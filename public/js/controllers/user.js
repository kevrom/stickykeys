'use strict';

var UserCtrl = {};

/* List all users */
UserCtrl.list = ['users', '$scope', '$stateParams', function(users, $scope, $stateParams) {
	$scope.users = users;
}];

UserCtrl.edit = ['user', '$scope', '$stateParams', function(user, $scope, $stateParams) {
	$scope.user = user;
}];

module.exports = UserCtrl;
