import React, { Component } from 'react';
import {
  Text
} from 'react-vr';
import { observer } from 'mobx-react/custom';

/**
 * Sensor Information Panel
 */
class InfoPanel extends Component {
  render() {
    const { store } = this.props;
    const text = `x: ${store.accel[0]} y: ${store.accel[1]} z: ${store.accel[2]}`;

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
            transform: [{translate: [0, 0, -30]}],
          }}>
        {text}
      </Text>
    );
  }
}
export default observer(InfoPanel);
