"use strict";

var path              = require("path");
var webpack           = require("webpack");
var AppCachePlugin    = require('appcache-webpack-plugin');
var SwigWebpackPlugin = require('swig-webpack-plugin');

module.exports = {
	cache: true,
	entry: {
		app: ["./src/js/main.js"]
	},
	output: {
		path: path.join(__dirname, "build"),
		publicPath: "",
		filename: "app.js",
		chunkFilename: "js/[hash].js",
		hotUpdateMainFilename: "js/update.json",
		hotUpdateChunkFilename: "js/update/[hash].update.js"
	},
	module: {
		loaders: [
			{ test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, // use ! to chain loaders
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=8192&name=img/[name].[ext]" }, // inline base64 URLs for <=8k images, direct URLs for the rest
			{ test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff&name=fonts/[name].[ext]" },
			{ test: /\.woff2$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff2&name=fonts/[name].[ext]" },
			{ test: /\.ttf$/, loader: "file-loader?prefix=font/&name=fonts/[name].[ext]" },
			{ test: /\.eot$/, loader: "file-loader?prefix=font/&name=fonts/[name].[ext]" },
			{ test: /\.svg$/, loader: "file-loader?prefix=font/&name=assets/[name].[ext]" }
		],
		preLoaders: [
			{
				test: /\.js$/,
				include: pathToRegExp(path.join(__dirname, "src/js")),
				loader: "jshint-loader"
			}
		]
	},
	resolve: {
		alias: {
			jquery: path.join(__dirname, "./src/lib/jquery/dist/jquery.min.js")
		}
	},
	plugins: [
		new AppCachePlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new SwigWebpackPlugin({
			template: './src/templates/*.html',
			watch: './src/templates/**/*.html',
			beautify: true
		})
	]
};

function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }
function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
