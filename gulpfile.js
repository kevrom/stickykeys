'use strict';

var gulp         = require('gulp');
var transform    = require('vinyl-transform');
var browserify   = require('browserify');
var merge        = require('merge-stream');
var concat       = require('gulp-concat');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var nodemon      = require('gulp-nodemon');
var sass         = require('gulp-sass');
var minifyCss    = require('gulp-minify-css');
var minifyHtml   = require('gulp-minify-html');
var sourcemaps   = require('gulp-sourcemaps');
var rimraf       = require('gulp-rimraf');
var runSequence  = require('run-sequence');
var Notification = require('node-notifier');
var notifier     = new Notification();

// Gulp paths
var paths = {
	build: './dist',
	js: {
		all: ['./app.js', './gruntfile.js', './public/js/*.js', './server/**/*.js'],
		server: ['./app.js', './gruntfile.js', './server/**/*.js'],
		public: ['./public/js/**/*.js']
	},
	sass: './public/sass/*.scss',
	img: './public/img/**/*',
	fonts: './public/fonts/**/*'
};


// Clean up build directory
gulp.task('clean', function() {
	return gulp.src(paths.build, { read: false })
		.pipe(rimraf());
});


// SASS compilation
gulp.task('styles', function() {
	return gulp.src(paths.sass)
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(gulp.dest(paths.build + '/css'));
});


// Javscript linting
gulp.task('lint', function() {
	return gulp.src(paths.js.all)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});


// Javascript assets pipeline
gulp.task('scripts', function() {
	var browserified = transform(function(file) {
		return browserify(file).bundle();
	});
	return gulp.src(['./public/js/main.js', './public/js/admin.js'])
		.pipe(browserified)
		.pipe(gulp.dest('./dist/js/'));
});


// Images
gulp.task('images', function() {
	return gulp.src(paths.img)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.build + '/img'));
});


// Fonts
gulp.task('fonts', function() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.build + '/fonts'));
});


// Vendor scripts and assets
gulp.task('vendor', function() {
	var bootstrap   = {};
	var fontawesome = {};
	var jquery, socketio;

	bootstrap.sass = gulp.src('./node_modules/bootstrap-sass/assets/stylesheets/bootstrap/bootstrap.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(gulp.dest(paths.build + '/vendor/bootstrap'));

	bootstrap.js = gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
		.pipe(gulp.dest(paths.build + '/vendor/bootstrap'));

	fontawesome.sass = gulp.src('./public/sass/font-awesome.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(minifyCss())
		.pipe(gulp.dest(paths.build + '/vendor/font-awesome'));

	fontawesome.fonts = gulp.src('./node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest(paths.build + '/vendor/font-awesome'));

	jquery = gulp.src('./node_modules/jquery/dist/jquery.js')
		.pipe(gulp.dest(paths.build + '/vendor/jquery'));

	socketio = gulp.src('./node_modules/socket.io-client/socket.io.js')
		.pipe(gulp.dest(paths.build + '/vendor/socket.io'));

	return merge(bootstrap.sass, bootstrap.js, fontawesome.sass, fontawesome.fonts, jquery, socketio);
});



// Watch function
gulp.task('watch', function() {
	gulp.watch(paths.sass, ['styles']);
	gulp.watch(paths.js.all, ['lint']);
	gulp.watch(paths.js.public, ['scripts']);
});


// Dev server
gulp.task('develop', function() {
	nodemon({
		script: 'app.js',
		ext: 'js'
	})
	.on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function() {
		notifier.notify({
			message: 'Development server started.'
		});
	});
});

gulp.task('build', function() {
	runSequence(
		// clean build directory
		'clean',

		// run these in parallel
		[
			'lint',
			'scripts',
			'styles',
			'images',
			'vendor'
		]);
});

gulp.task('default', function() {
	runSequence(
		// clean build directory
		'clean',

		// run these in parallel
		[
			'lint',
			'scripts',
			'styles',
			'images',
			'vendor'
		],

		// start dev server
		'develop'
	);
});
