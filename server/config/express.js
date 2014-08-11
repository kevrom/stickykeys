'use strict';

var logger         = require('morgan');
var path           = require('path');
var responseTime   = require('response-time');
var methodOverride = require('method-override');
var multer         = require('multer');
var compression    = require('compression');
var favicon        = require('serve-favicon');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var RedisStore     = require('connect-redis')(session);
var errorHandler   = require('errorhandler');
var env            = process.env.NODE_ENV || 'development';
var pkg            = require('../../package.json');
var flash          = require('express-flash');
var routes         = require('../routes');
var _              = require('lodash');

module.exports = function (app, express, passport) {
	var config = app.config;

	var allowCrossDomain = function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Credentials', true);
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	};

	// settings
	app
		.set('env', env)
		.set('port', config.server.port || 3000)
		.set('views', path.join(__dirname, '../../server/views'))
		.set('view engine', 'jade');

	app
		.enable('trust proxy');

	app
		.disable('x-powered-by');

	// Express middleware
	app
		.use(favicon(config.root + '/public/favicon.png'))
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({
			extended: true
		}))
		// .use(multer())
		.use(methodOverride());

	if (config.allowCrossDomain) {
		app.use(allowCrossDomain);
	}

	app.use(cookieParser('whoareyouandwhatareyoudoinghere'));
	app.use(session({
		secret: pkg.name,
		saveUninitialized: true,
		resave: true,
		store: new RedisStore()
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session({
		maxAge: new Date(Date.now() + 3600000)
	}));

	app.use(express.static(path.join(app.config.root, 'dist')));
	app.use(function (req, res, next) {
		res.locals.pkg = pkg;
		res.locals.NODE_ENV = env;
		res.locals.config = config;

		if(_.isObject(req.user)) {
			res.locals.User = req.user;
		}

		next();
	});

//	app.use(views_helpers(pkg.name));
	app.use(flash());

	/** ROUTES Apps */
	app.use(routes);

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(logger('dev'));
		app.use(errorHandler());
		app.use(responseTime());
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('500', {
				message: err.message,
				error: err
			});
		});
	} else {
		app.use(logger());
		app.use(compression({
			filter: function (req, res) {
				return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
			},
			level: 9
		}));
	}

	// error handlers

	// catch 404 and forwarding to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		res.status(404).render('404', {
			url: req.protocol + '://' + req.headers.host + req.originalUrl,
			error: 'Page not found!'
		});
	});

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('500', {
			message: err.message,
			error: {}
		});
	});
};
