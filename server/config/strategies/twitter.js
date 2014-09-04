'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User            = require('../models').User;

module.exports = function(app, passport) {
	passport.use(new TwitterStrategy(app.config.twitter, function(req, accessToken, tokenSecret, profile, done) {
		if (req.user) {
			User.findOne({ $or: [
					{'twitter.id': profile.id },
					{ username: profile.username },
					{ email: profile.username + "@twitter.com" }] },
			function(err, existingUser) {
				if (existingUser) {
					req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
					done(err);
				} else {
					User.findById(req.user.id, function(err, user) {
						user.email         = profile.username + "@twitter.com";
						user.provider      = 'twitter';
						user.twitter       = profile._json;
						user.photo_profile = profile._json.profile_image_url;
						user.username      = profile.username;
						user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });

						user.save(function(err) {
							req.flash('info', { msg: 'Twitter account has been linked.' });
							done(err, user);
						});
					});
				}
			});

		} else {
			User.findOne({ 'twitter.id_str': profile.id }, function(err, existingUser) {
				if (existingUser) {
					return done(null, existingUser);
				}
				var user = new User();
				// Twitter will not provide an email address.  Period.
				// But a person’s twitter username is guaranteed to be unique
				// so we can "fake" a twitter email address as follows:

				user.email         = profile.username + "@twitter.com";
				user.provider      = 'twitter';
				user.twitter       = profile._json;
				user.photo_profile = profile._json.profile_image_url;
				user.username      = profile.username;
				user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });

				user.save(function(err) {
					done(err, user);
				});
			});
		}
	}));
};
