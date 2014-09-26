'use strict';

var config = require('../../../config/config');
var models = require(config.root + '/server/models');
var Ticket = models.Ticket;
var Customer = models.Customer;
var ModelAPI = require('./Model');

var CustomerAPI = new ModelAPI('Customer');


module.exports = CustomerAPI;
