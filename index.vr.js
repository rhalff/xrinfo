import React from 'react';
import loadWASM from './static_assets/lib/webdsp';
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

let webdsp = {};
loadWASM().then(module => {
  webdsp = module;
  // things to execute on page load only after module is loaded
  console.log('webdsp loaded?');
});

AppRegistry.registerComponent('xrinfo', () => xrinfo);
