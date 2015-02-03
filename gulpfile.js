/**
 *
 * Frontend workflow with Gulp, Webpack, Bower and Swig.
 * 
 * @author https://github.com/jaylinski
 * @source https://github.com/jaylinski/frontend-webpack
 * @license https://github.com/jaylinski/frontend-webpack#copyright-and-license
 *
 */

'use strict';

var gulp          = require('gulp');
var gulpUtil      = require("gulp-util");
var gulpBower     = require("gulp-bower");
var gulpChanged   = require("gulp-changed");
var gulpImagemin  = require("gulp-imagemin");
var webpack       = require('webpack');
var webpackServer = require('webpack-dev-server'),
    webpackServerInstance;
var rimraf        = require('rimraf');
var config        = require('./gulp.config.json');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['root', 'assets', 'images', 'webpack-dev-server']);
gulp.task('build',   ['clean', 'bower', 'root', 'assets', 'images', 'webpack:build']);

gulp.task('clean', function(callback) {
	rimraf.sync(config.clean, function(err){
		gulpUtil.log("[clean] errored");
	});
	callback();
});

gulp.task('root', function() {
	return gulp.src(config.root.src)
		.pipe(gulp.dest(config.root.dest));
});

gulp.task('bower', function(callback) {
	gulpBower()
		.pipe(gulp.dest(config.bowerOptions.paths.dest));
	callback();
});

gulp.task('images', function() {
	return gulp.src(config.images.src)
		.pipe(gulpChanged(config.images.dest))
		.pipe(gulpImagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.images.dest));
});

gulp.task('assets', function() {
	return gulp.src(config.assets.src)
		.pipe(gulpChanged(config.assets.dest))
		.pipe(gulp.dest(config.assets.dest));
});

gulp.task("webpack:build", ['bower'], function(callback) {
	// modify some webpack config options
	var configObj = Object.create(webpackConfig);
	configObj.plugins = configObj.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);
	// run webpackConfig
	webpack(configObj, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gulpUtil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack-dev-server", function(callback) {	
	var configObj = Object.create(webpackConfig);	
	webpackServerInstance = new webpackServer(webpack(webpackConfig), {
		contentBase: config.webpackOptions.paths.contentBase,
		publicPath: "/" + configObj.output.publicPath,
		hot: config.webpackOptions.server.hot,
		stats: { colors: true }
	}).listen(config.webpackOptions.server.port, config.webpackOptions.server.host, function(err) {
		if(err) throw new gulpUtil.PluginError("webpack-dev-server", err);
		gulpUtil.log("[webpack-dev-server]", config.webpackOptions.server.protocol + "://" + config.webpackOptions.server.host + ":" + config.webpackOptions.server.port);
	});
});
