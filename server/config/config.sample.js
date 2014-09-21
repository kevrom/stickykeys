'use strict';

var path     = require('path');
var rootPath = path.normalize(__dirname + '/../..');
var pkg      = require(rootPath + '/package.json');
var config;

config = {

	// Development config
	development: {
		app      : {
			name          : 'Steve Dev',
			description   : pkg.description || '',
			keywords      : pkg.keywords || [],
			author        : pkg.author || ''
		},
		server: {
			port          : 8010,
			hostname      : 'localhost',
		},
		allowCrossDomain  : false,
		database: {
			name          : 'nodebp',
			username      : 'steve',
			password      : 'blahblah'
		},
		email: {
			name          : 'Bob Dole',
			address       : 'bobdole@gmail.com',
			service       : 'gmail',
			auth: {
				username  : 'bobdole@gmail.com',
				password  : 'ihatepolitics'
			}
		},
		root              : rootPath,
		localAuth         : true,
		twitterAuth       : false,
		twitter: {
			consumerKey: process.env.TWITTER_KEY || '',
			consumerSecret: process.env.TWITTER_SECRET  || '',
			callbackURL: '/auth/twitter/callback',
			passReqToCallback: true
		},
		facebookAuth      : false,
		facebook: {
			clientID: process.env.FACEBOOK_ID || '',
			clientSecret: process.env.FACEBOOK_SECRET || '',
			callbackURL: '/auth/facebook/callback',
			passReqToCallback: true
		},
		googleAuth        : false,
		google: {
			clientID: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
			callbackURL: '/auth/google/callback',
			passReqToCallback: true
		}
	},

	// Production Config
	production: {
		app      : {
			name          : 'Steve Prod',
			description   : pkg.description || '',
			keywords      : pkg.keywords || [],
			author        : pkg.author || ''
		},
		server: {
			port          : 8010,
			hostname      : process.env.HOSTNAME || '127.0.0.1',
		},
		allowCrossDomain  : false,
		database: {
			name          : 'nodebp',
			username      : 'steve',
			password      : 'blahblah'
		},
		email: {
			name          : 'Bob Dole',
			address       : 'bobdole@gmail.com',
			service       : 'gmail',
			auth: {
				username  : 'bobdole@gmail.com',
				password  : 'ihatepolitics'
			}
		},
		root              : rootPath,
		localAuth         : true,
		twitterAuth       : false,
		twitter: {
			consumerKey: process.env.TWITTER_KEY || '',
			consumerSecret: process.env.TWITTER_SECRET  || '',
			callbackURL: '/auth/twitter/callback',
			passReqToCallback: true
		},
		facebookAuth      : false,
		facebook: {
			clientID: process.env.FACEBOOK_ID || '',
			clientSecret: process.env.FACEBOOK_SECRET || '',
			callbackURL: '/auth/facebook/callback',
			passReqToCallback: true
		},
		googleAuth        : false,
		google: {
			clientID: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
			callbackURL: '/auth/google/callback',
			passReqToCallback: true
		}
},

	// Testing config
	test: {
		server: {
			port          : 4001,
			hostname      : 'localhost',
		},
		database: {
			name          : 'nodebp_test',
			username      : 'steve',
			password      : 'blahblah'
		}
	}
};

module.exports = config[process.env.NODE_ENV || 'development'];
