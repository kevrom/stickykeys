'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User          = require('../../models').User;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User
			.find({ where: { id: id }})
			.success(function(user) {
				console.log('Deserialize: ' + user);
				done(null, user);
			})
			.error(function(err) {
				console.log('Error deserializing user');
				done(err, null);
			});
	});

	passport.use(new LocalStrategy({
		passReqToCallback: true
	},
	function(req, email, password, done) {

		console.log(req);

		User
			.find({ where:  { email: email }})
			.success(function(user) {
				if (!user.authenticate(password)) {
					return done(null, false, { message: 'Password is incorrect.' });
				}
				return done(null, user);
			})
			.error(function(err) {
				console.error(err);
				return done(err);
				//return done(null, false, { message: 'User does not exist.' });
			});
	}));
};
