'use strict';

var Route           = require('express').Router();
var config          = require('../config/config');
var Auth            = require(config.root + '/server/middleware/auth');
var indexController = require(config.root + '/server/controllers');

Route.get('/', indexController.index);
Route.post('/ticket', indexController.ticket);

// User routes
Route.use(require('./user'));

// Admin routes
Route.use('/admin', require('./admin'));


module.exports = Route;
