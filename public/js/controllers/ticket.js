'use strict';

var TicketCtrl = {};

/* List all tickets */
TicketCtrl.list = ['Ticket', '$scope', '$stateParams', function(Ticket, $scope, $stateParams) {
	var getTickets = function() {
		Ticket.findAll(function(tickets) {
			$scope.tickets = tickets;
		}, function(err) {
			console.log(err);
		});
	};

	var init = function() {
		getTickets();
	};

	init();
}];

module.exports = TicketCtrl;
