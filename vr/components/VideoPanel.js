import React, { Component } from 'react';
import {
  MediaPlayerState,
  Text,
  View,
  Video,
  VideoControl
} from 'react-vr';

import { observer } from 'mobx-react/custom';

class VideoPanel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // init with muted, autoPlay
      playerState: new MediaPlayerState({autoPlay: true, muted: false})
    };
  }
  render() {
    const {
      webcam
    } =  this.props;

    if (webcam.uri) {
      this.state.playerState.play();

      console.log('playing source', webcam);

      return (
        <View
          style={{
            alignItems: 'center',
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{translate: [0, 0, -5]}],
          }}
        >
          <Video
            autoPlay
            style={{
              // tintColor: '#777879',
              height: 6.25,
              borderWidth: 2,
              width: 8
            }}
            source={webcam}
            muted={false}
            playerState={this.state.playerState}
          />
          <VideoControl
            style={{
              backgroundColor: '#777879',
              height: 0.2,
              width: 4
            }}
            playerState={this.state.playerState}
          />
        </View>
      );
    } else {
      return (
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [2, 4, -30]}],
          }}>No video</Text>
      );
    }
  }
}

export default observer(VideoPanel);
