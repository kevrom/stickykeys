var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');

var path = require('path');
var config = require('./server/config/config');

gulp.task('styles', function() {
	return gulp.src('public/scss/main.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('jshint', function() {
	return gulp.src(['app.js', 'gulpfile.js', './server/**/*.js', './client/js/**/*.js'])
		.pipe(jshint());
});

gulp.task('default', function() {
	nodemon({
		script: 'app.js',
		ext: 'html js',
	})
	.on('change', ['jshint'])
	.on('restart', function() {
		console.log('Server restarted.');
		notify('Development server restarted.');
	});
});
