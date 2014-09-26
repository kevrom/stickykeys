'use strict';

var config = require('../../../config/config');
var models = require(config.root + '/server/models');
var Ticket = models.Ticket;
var Customer = models.Customer;
var ModelAPI = require('./Model');

var UserAPI = new ModelAPI('User');


module.exports = UserAPI;
