// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import requestUserMedia from './lib/requestUserMedia';
import getWorker from './lib/getWorker';
import getUserMedia from 'getusermedia';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'xrinfo', parent, {
    // Add custom options here
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();

  const worker = getWorker(vr);

  setTimeout(() => {
    getUserMedia((error, stream) => {
      if (error) {
        console.error('failed', error);
      } else {
        console.log('got a stream', stream);

        const uri = window.URL.createObjectURL(stream);

        console.log('created webcam uri', uri);

        worker.postMessage({
          type: 'webcam',
          payload: {
            uri: uri
          }
        });

        console.log('posted message!?');
      }
    });
  }, 1500);

  return vr;
}

window.ReactVR = {init};
