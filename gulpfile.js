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
var webpack       = require('webpack');
var webpackServer = require('webpack-dev-server');
var config        = require('./gulp.config.json');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['webpack-dev-server']);
gulp.task('build',   ['bower', 'webpack:build']); // ToDo: clean

gulp.task('root', function() {
	return true;
	//return gulp.src(config.srcPaths.root)
	//	.pipe(gulp.dest(config.destPaths.root));
});

gulp.task('bower', function(callback) {
	gulpBower()
		.pipe(gulp.dest(config.bowerOptions.paths.dest));
	callback();
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
	new webpackServer(webpack(webpackConfig), {
		contentBase: "build/",
		publicPath: "/" + configObj.output.publicPath,
		hot: true,
		stats: { colors: true }
	}).listen(config.webpackOptions.server.port, config.webpackOptions.server.host, function(err) {
		if(err) throw new gulpUtil.PluginError("webpack-dev-server", err);
		gulpUtil.log("[webpack-dev-server]", "http://" + config.webpackOptions.server.host + ":" + config.webpackOptions.server.port);
	});
});
