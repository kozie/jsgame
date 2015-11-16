gulp       = require "gulp"

browserify = require "browserify"
babelify   = require "babelify"
watchify   = require "watchify"
stringify  = require "stringify"

source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"

rename     = require "gulp-rename"
uglify     = require "gulp-uglify"
sourcemaps = require "gulp-sourcemaps"

express    = require "express"

# plumber    = require "gulp-plumber"
notify     = require "gulp-notify"
gutil      = require "gulp-util"
chalk      = require "chalk"
del        = require "del"

# Settings & global stuff
port = 8000
server = express()
server.use express.static "."
server.use express.static "./build"

# Watch & build
gulp.task "watch", ->
	bundler = watchify browserify "./src/main.js", debug: true #watchify.args
		.transform stringify [".json"]
		.transform babelify

	# Build first
	bundle bundler

	# Watch for future builds
	bundler.on "update", ->
		bundle bundler

	gutil.log chalk.green "Watching for changes..."

# Server task
gulp.task "serve", ->
	server.listen port
	gutil.log chalk.green "Serving on port #{port}"

# Default task. Runs Serve & watch
gulp.task "default", ["serve", "watch"]

clean = ->
	del [
		'./build/**/*'
	]

# Function to build through a bundler
bundle = (bundler) ->
	gutil.log chalk.yellow "building..."

	clean()

	bundler.bundle()
		.on "log", gutil.log
		.on "error", (err) ->
			gutil.log chalk.red err
			notify().write(err)
		.pipe source "main.js"
		.pipe buffer()
		.pipe rename "game.js"
		.pipe sourcemaps.init loadMaps:true
		.pipe uglify()
		.pipe sourcemaps.write "."
		.pipe gulp.dest "build"
		.pipe notify message: "Build successful! Well done, Kozie", onLast: true
