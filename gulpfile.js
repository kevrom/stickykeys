var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var gNotify = require('gulp-notify');
var Notification = require('node-notifier');
var notifier = new Notification();

var jsAssets = ['app.js', 'gruntfile.js', 'public/js/*.js', 'server/**/*.js'];
var cssAssets = 'public/sass/*.scss';

gulp.task('styles', function() {
	return gulp.src('public/sass/main.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function() {
	return gulp.src(jsAssets)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
	gulp.watch(cssAssets, ['styles']);
	gulp.watch(jsAssets, ['lint']);
});

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

gulp.task('default', ['styles', 'lint', 'develop']);
