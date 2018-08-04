import { h, Component } from 'preact';
import './style.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className="c-notFound b-content">
        <h1 className="c-notFound__headline">Not found</h1>
        <div className="c-notFound__video">
          <video src="https://media.giphy.com/media/hEc4k5pN17GZq/giphy.mp4" muted loop autoPlay />
        </div>
      </div>
    );
  }
}
