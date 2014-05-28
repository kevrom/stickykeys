var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

var config = {

	// Development config
	development: {
		server: {
			port: 8000,
			hostname: 'localhost',
		},
		database: {
			name: 'nodebp',
			username: 'steve',
			password: 'blahblah'
		},
		root     : rootPath,
		app      : {
			name : 'SteveDev'
		},
		twitterAuth: false,
		twitter: {
			consumerKey: process.env.TWITTER_KEY || '',
			consumerSecret: process.env.TWITTER_SECRET  || '',
			callbackURL: '/auth/twitter/callback',
			passReqToCallback: true
		},
		facebookAuth: false,
		facebook: {
			clientID: process.env.FACEBOOK_ID || '',
			clientSecret: process.env.FACEBOOK_SECRET || '',
			callbackURL: '/auth/facebook/callback',
			passReqToCallback: true
		}
	},

	// Production Config
	production: {
		server: {
			port: 8001,
			hostname: process.env.HOSTNAME || '127.0.0.1',
		},
		database: {
			name: 'nodebp',
			username: 'steve',
			password: 'blahblah'
		},
		root     : rootPath,
		app      : {
			name : 'Steve\'s Music App'
		},
		twitterAuth: false,
		twitter: {
			// https://apps.twitter.com/app/6070534/keys
			consumerKey: process.env.TWITTER_KEY || '',
			consumerSecret: process.env.TWITTER_SECRET  || '',
			callbackURL: '/auth/twitter/callback',
			passReqToCallback: true
		},
		facebookAuth: false,
		facebook: {
			clientID: process.env.FACEBOOK_ID || '',
			clientSecret: process.env.FACEBOOK_SECRET || '',
			callbackURL: '/auth/facebook/callback',
			passReqToCallback: true
		}
	},

	// Testing config
	test: {
		server: {
			port: 4001,
			hostname: 'localhost',
		},
		database: {
			name: 'nodebp_test',
			username: 'steve',
			password: 'blahblah'
		}
	}
};

module.exports = config[process.env.NODE_ENV || 'development'];