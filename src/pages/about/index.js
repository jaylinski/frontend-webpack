import { h, Component } from 'preact';
import './style.css';

export default class About extends Component {
  render() {
    return (
      <div className="c-about b-content">
        <h1>About frontend-webpack</h1>
        <p>
          Opinionated frontend workflow with webpack and Preact.
        </p>
      </div>
    );
  }
}
