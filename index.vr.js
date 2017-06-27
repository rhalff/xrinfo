import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View
} from 'react-vr';

import VideoPanel from './vr/components/VideoPanel';
import InfoPanel from './vr/components/InfoPanel';
import sensorStore from './vr/stores/sensor';
import Messenger from './vr/lib/Messenger';

Messenger.on('webcam', (payload) => {
  console.log('GOT DATA', payload);
  sensorStore.webcam.uri = payload.uri;
});

Messenger.start();

export default class xrinfo extends React.Component {
  render() {
    return (
      <View>
        <VideoPanel webcam={sensorStore.webcam} />
        <InfoPanel store={sensorStore} />
      </View>
    );
  }
};

AppRegistry.registerComponent('xrinfo', () => xrinfo);
