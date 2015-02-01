/* webpack examples */

/* load bootstrap with a promise */
var cssBootstrap = require('promise?bluebird,bootstrap.css!../less/bootstrap.less');
cssBootstrap().then(function() {
	console.log('bootstrap css loaded');
});