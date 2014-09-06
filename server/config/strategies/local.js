'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User          = require('../../models').User;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log('Serialize: ' + user);
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
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {
		User
			.find({ where:  { email: email }})
			.success(function(user) {
				user.authenticate(password, function(err, res) {
					if (err) {
						console.error(err);
						return done(err, null);
					}
					if (!res) {
						console.log('Invalid password');
						return done(null, false, { message: 'Password is incorrect.' });
					}
					return done(null, user);
				});
			})
			.error(function(err) {
				console.error(err);
				return done(err);
				//return done(null, false, { message: 'User does not exist.' });
			});
	}));
};
