"use strict";

var path              = require("path");
var webpack           = require("webpack");
var AppCachePlugin    = require('appcache-webpack-plugin');
var SwigWebpackPlugin = require('swig-webpack-plugin');

module.exports = {
	cache: true,
	entry: {
		app: ["webpack/hot/dev-server", "./src/js/main.js"]
	},
	output: {
		path: path.join(__dirname, "build/js"),
		publicPath: "js/",
		filename: "app.js"
	},
	module: {
		loaders: [
			{ test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, // use ! to chain loaders
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" }, // inline base64 URLs for <=8k images, direct URLs for the rest
			{ test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.woff2$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff2" },
			{ test: /\.ttf$/, loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/, loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/, loader: "file-loader?prefix=font/" }
		]
	},
	plugins: [
		new AppCachePlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new SwigWebpackPlugin({
			template: 'src/templates/index.html',
			filename: '../test.html',
			beautify: true
		})
	]
};
