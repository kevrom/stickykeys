'use strict';

var TicketCtrl = {};

/* List all tickets */
TicketCtrl.list = ['tickets', '$scope', '$stateParams', function(tickets, $scope, $stateParams) {
	$scope.tickets = tickets;
}];

module.exports = TicketCtrl;
