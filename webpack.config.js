"use strict";

var path              = require("path");
var webpack           = require("webpack");
var AppCachePlugin    = require('appcache-webpack-plugin');
var SwigWebpackPlugin = require('swig-webpack-plugin');

module.exports = {
	cache: true,
	entry: {
		// Uncomment to activate HMR
		app: ["webpack/hot/dev-server", "./src/js/main.js"]
		//app: ["./src/js/main.js"]
	},
	output: {
		path: path.join(__dirname, "build"),
		publicPath: "",
		filename: "app.js",
		chunkFilename: "js/[id].js",
		hotUpdateMainFilename: "js/update.json",
		hotUpdateChunkFilename: "js/update/[id].update.js"
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
		],
		preLoaders: [
			{
				test: /\.js$/,
				include: pathToRegExp(path.join(__dirname, "src/js")),
				loader: "jshint-loader"
			}
		]
	},
	jshint: {
	},
	plugins: [
		// Uncomment to activate HMR
		new webpack.HotModuleReplacementPlugin(),
		new AppCachePlugin(),
		new SwigWebpackPlugin({
			template: 'src/templates/index.html',
			filename: 'index.html',
			beautify: true
		})
	]
};

function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }
function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
