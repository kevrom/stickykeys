'use strict';

var gulp         = require('gulp');
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
		public: ['./public/js/*.js']
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
	return gulp.src(paths.js.public)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.build + '/js'));
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


// Bootstrap assets
gulp.task('bootstrap-css', function() {
	return gulp.src('./node_modules/bootstrap-sass/assets/stylesheets/bootstrap/bootstrap.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(gulp.dest(paths.build + '/lib/bootstrap'));
});
gulp.task('bootstrap-js', function() {
	return gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
		.pipe(gulp.dest(paths.build + '/lib/bootstrap'));
});
gulp.task('bootstrap', ['bootstrap-js', 'bootstrap-css']);


// Font Awesome
gulp.task('fontawesome-css', function() {
	return gulp.src('./public/lib/font-awesome.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest(paths.build + '/lib/font-awesome'));
});
gulp.task('fontawesome-fonts', function() {
	return gulp.src('./node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest(paths.build + '/lib/font-awesome'));
});


// jQuery
gulp.task('jquery', function() {
	return gulp.src('./node_modules/jquery/dist/jquery.js')
		.pipe(gulp.dest(paths.build + '/lib/jquery'));
});


// Watch function
gulp.task('watch', function() {
	gulp.watch(paths.sass, ['styles']);
	gulp.watch(paths.js.all, ['lint']);
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

gulp.task('default', function(cb) {
	runSequence(
		// clean build directory
		'clean',

		// run these in parallel
		[
			'lint',
			'jquery',
			'bootstrap',
			'fontawesome-css',
			'fontawesome-fonts',
			'styles',
			'images'
		],

		// start dev server
		'develop',

		cb);
});
