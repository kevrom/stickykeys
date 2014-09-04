'use strict';

var BearerStrategy = require('passport-http-bearer').Strategy;
var User           = require('../../models').User;

module.exports = function(passport) {
	passport.use(new BearerStrategy({
		passReqToCallback: true
	},
	function(req, token, done) {

		console.log(req);

		User.find({ where:  { token: token }}, function (err, user) {

			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, { message: 'User does not exist.' });
			}

			return done(null, user);
		});
	}));
};
