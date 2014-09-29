'use strict';

var angular      = require('angular');
var UserCtrl     = require('./user');
var CustomerCtrl = require('./customer');
var TicketCtrl   = require('./ticket');


angular.module('admin.controllers', [])
	.controller('UserListCtrl',     UserCtrl.list)
	.controller('UserEditCtrl',     UserCtrl.edit)
	.controller('CustomerListCtrl', CustomerCtrl.list)
	.controller('CustomerEditCtrl', CustomerCtrl.edit)
	.controller('TicketListCtrl',   TicketCtrl.list)
	.controller('TicketEditCtrl',   TicketCtrl.edit);
