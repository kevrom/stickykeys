var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var gNotify = require('gulp-notify');
var Notification = require('node-notifier');
var del = require('del');
var notifier = new Notification();

// Gulp paths
var paths = {
	build: './dist',
	js: {
		all: ['./app.js', './gruntfile.js', './public/js/*.js', './server/**/*.js'],
		server: ['./app.js', './gruntfile.js', './server/**/*.js'],
		public: ['./public/js/*.js']
	},
	sass: './public/sass/*.scss',
	img: './public/img/**/*'
};


// Clean up build directory
gulp.task('clean', function(cb) {
	del(['dist'], cb);
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

gulp.task('default', ['jquery', 'bootstrap', 'styles', 'lint', 'develop']);
