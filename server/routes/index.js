'use strict';

var Route = require('express').Router();
var config = require('../config/config');
var Auth = require(config.root + '/server/middleware/auth');
var indexController = require(config.root + '/server/controllers');

Route.get('/', indexController.index);

// User routes
Route.use(require('./user'));


module.exports = Route;
