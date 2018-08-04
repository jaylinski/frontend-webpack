import { customEventPolyfill } from './utils/polyfills';
import { h, render } from 'preact';

customEventPolyfill();

let root;

function init() {
  let App = require('./pages/app').default; // eslint-disable-line no-undef
  root = render(<App />, document.getElementById('app'), root);
}

// In development, set up HMR:
/* eslint-disable no-undef */
if (module.hot) {
  require('preact/devtools');
  module.hot.accept('./pages/app', () => requestAnimationFrame(init));
}
/* eslint-enable */

init();
