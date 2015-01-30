var cssBootstrap = require('promise?bluebird,bootstrap.css!../less/bootstrap.less');
var cssMain = require('promise?bluebird,main.css!../less/main.less');

cssBootstrap().then(function() {
	// remove loading screen
	console.log('bootstrap css loaded');
});
cssMain().then(function() {
	// remove loading screen
	console.log('main css loaded');
});

(function () {
	'use strict';

	var foo = 'foo';
	foo = 'test';
})();
