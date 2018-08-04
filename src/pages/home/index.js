import { h, Component } from 'preact';
import Example from './../../components/example';
import './style.css';

export default class Home extends Component {
  render() {
    return (
      <div className="c-home">
        <Example />
      </div>
    );
  }
}
