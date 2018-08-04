import { h, Component } from 'preact';
import Router from 'preact-router';

import Home from './home';
import Imprint from './imprint';
import About from './about';
import NotFound from './not-found';
import './app.css';

const TITLE = 'frontend-webpack';
const TITLE_SEPERATOR = '–';

export default class App extends Component {
  async handleRoute(event) {
    if (event.current.attributes.title !== undefined) {
      document.title = `${event.current.attributes.title} ${TITLE_SEPERATOR} ${TITLE}`;
    }
  }

  render() {
    return (
      <Router onChange={this.handleRoute.bind(this)}>
        <Home path="/" />
        <About path="/about/" title="About" />
        <Imprint path="/imprint/" title="Imprint" />
        <NotFound default title="404" />
      </Router>
    );
  }
}
