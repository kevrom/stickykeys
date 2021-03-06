'use strict';

var TicketCtrl = {};

/* List all tickets */
TicketCtrl.list = ['tickets', '$scope', '$stateParams', function(tickets, $scope, $stateParams) {
	$scope.tickets = tickets;
}];

TicketCtrl.edit = ['ticket', '$scope', '$stateParams', function(ticket, $scope, $stateParams) {
	$scope.ticket = ticket;

	$scope.save = function(ticket) {
		ticket.save();
	};
}];

module.exports = TicketCtrl;
