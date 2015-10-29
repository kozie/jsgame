var gulp = require('gulp');

var browserify = require('browserify');
var babelify   = require('babelify');
var watchify   = require('watchify');
var stringify  = require('stringify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var express = require('express');

var gutil = require('gulp-util');
var chalk = require('chalk');

// Settings & global stuff
var port = 8000;
var server = express();
server.use(express.static('.'));
server.use(express.static('./build'));

// Watch & build
gulp.task('watch', function() {
	var bundler = watchify(browserify('./src/main.js', watchify.args))
		.transform(stringify(['.json']))
		.transform(babelify);

	// Build first
	bundle(bundler);

	// Watch for future builds
	bundler.on('update', function() {
		bundle(bundler);
	});

	gutil.log(chalk.green('Watching for changes...'));
});

// Server task
gulp.task('serve', function() {
	server.listen(port);

	gutil.log(chalk.green('Serving on port ' + port));
});

// Default task. Runs Serve & watch
gulp.task('default', ['serve', 'watch']);

// Function to build through a bundler
function bundle(bundler) {
	gutil.log(chalk.yellow('building...'));

	var ret = bundler.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(rename('game.js'))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build'));

	gutil.log(chalk.green('Built!'));

	return ret;
}