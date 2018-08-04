import { h, Component } from 'preact';
import './style.css';

export default class Imprint extends Component {
  render() {
    return (
      <div className="c-imprint b-content">
        <h1>Imprint</h1>
        <p>
          Name
          <br />
          Address
          <br />
          Country
          <br />
          contact@example.com
        </p>
      </div>
    );
  }
}
