'use strict';

var angular      = require('angular');
var UserCtrl     = require('./user');
var CustomerCtrl = require('./customer');
var TicketCtrl   = require('./ticket');


angular.module('admin.controllers', [])
	.controller('UserListCtrl',     UserCtrl.list)
	.controller('CustomerListCtrl', CustomerCtrl.list)
	.controller('TicketListCtrl',   TicketCtrl.list);
