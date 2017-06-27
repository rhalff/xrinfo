import React, { Component } from 'react';
// import { Video } from 'react-vr-web';
import { Video } from 'react-vr';
import PropTypes from 'prop-types';


export default class Webcam extends Component {
  static defaultProps = {
    audio: true,
    className: '',
    height: 480,
    muted: false,
    onUserMedia: () => {},
    screenshotFormat: 'image/webp',
    width: 640,
  };

  static propTypes = {
    audio: PropTypes.bool,
    muted: PropTypes.bool,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    screenshotFormat: PropTypes.oneOf([
      'image/webp',
      'image/png',
      'image/jpeg',
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    audioSource: PropTypes.string,
    videoSource: PropTypes.string,
  };

  static mountedInstances = [];

  static userMediaRequested = false;

  constructor() {
    super();
    this.state = {
      hasUserMedia: false,
    };
  }

  componentDidMount() {
    console.log('Webcam mounted');

    if (!hasGetUserMedia()) return;

    Webcam.mountedInstances.push(this);

    if (!this.state.hasUserMedia && !Webcam.userMediaRequested) {
      this.requestUserMedia();
    }
  }

  componentWillUnmount() {
    const index = Webcam.mountedInstances.indexOf(this);
    Webcam.mountedInstances.splice(index, 1);

    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {
      if (this.stream.stop) {
        this.stream.stop();
      } else {
        if (this.stream.getVideoTracks) {
          this.stream.getVideoTracks().map(track => track.stop());
        }
        if (this.stream.getAudioTracks) {
          this.stream.getAudioTracks().map(track => track.stop());
        }
      }
      Webcam.userMediaRequested = false;
      window.URL.revokeObjectURL(this.state.src.uri);
    }
  }



  handleUserMedia(error, stream) {
    if (error) {
      this.setState({
        hasUserMedia: false,
      });

      return;
    }

    const src = {
      uri: window.URL.createObjectURL(stream),
      // format: ...,
      // metaData
    };

    this.stream = stream;
    this.setState({
      hasUserMedia: true,
      src,
    });

    this.props.onUserMedia();
  }

  render() {
    return (
      <Video
        autoPlay
        width={this.props.width}
        height={this.props.height}
        source={this.state.src}
        muted={this.props.muted}
        className={this.props.className}
        style={this.props.style}
      />
    );
  }
}
