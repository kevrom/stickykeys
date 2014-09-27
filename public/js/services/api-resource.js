/* Setup by attaching:
	.constant('API_CONFIG', {
		API_KEY: '',
		BASE_URL: ''
	})
	to your Angular config */

'use strict';

var angular = require('angular');

angular.module('API.resource', ['restangular'])
	.factory('RestangularResource', ['API_CONFIG', 'Restangular', function(API_CONFIG, Restangular) {
		var config = API_CONFIG;
		Restangular.setBaseUrl(config.BASE_URL);

		function ResourceFactory(collection) {
			var Resource = function(data) {
				angular.extend(this, data);
			};

			Resource.findAll = function(successCb, errorCb) {
				Restangular.all(collection).getList().then(function(data) {
					successCb(data);
				}, function(err) {
					errorCb(err);
				});
			};

			Resource.find = function(id, successCb, errorCb) {
				Restangular.one(collection, id).get().then(function(data) {
					successCb(data);
				}, function(err) {
					errorCb(err);
				});
			};

			Resource.prototype.$save = function(successCb, errorCb) {
				Restangular.all(collection).post(this).then(function() {
					successCb();
				}, function(err) {
					errorCb(err);
				});
			};

			Resource.prototype.$update = function(successCb, errorCb) {
				this.put().then(function() {
					successCb();
				}, function(err) {
					errorCb(err);
				});
			};

			Resource.prototype.$saveOrUpdate = function(successCb, errorCb) {
				if (this._id) {
					this.put().then(function() {
						successCb();
					}, function(err) {
						errorCb(err);
					});
				} else {
					Restangular.all(collection).post(this).then(function() {
						successCb();
					}, function(err) {
						errorCb(err);
					});
				}
			};

			Resource.prototype.$remove = function(successCb, errorCb) {
				this.remove().then(function() {
					successCb();
				}, function(err) {
					errorCb(err);
				});
			};

			return Resource;
		}

		return ResourceFactory;
	}]);

