navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const Webcam = {
  mountedInstances: [],
  userMediaRequested: false,
  useAudio: false
};

function sourceSelected (audioSource, videoSource) {
  const constraints = {
    video: {
      optional: [{ sourceId: videoSource }],
    },
  };


  if (Webcam.useAudio) {
    constraints.audio = {
      optional: [{ sourceId: audioSource }],
    };
  }

  navigator.getUserMedia(constraints, (stream) => {
    Webcam.mountedInstances.forEach(instance => instance.handleUserMedia(null, stream));
  }, (e) => {
    Webcam.mountedInstances.forEach(instance => instance.handleUserMedia(e));
  });
};

export default function requestUserMedia(audioSource, videoSource) {
  if (audioSource && videoSource) {
    sourceSelected(audioSource, videoSource);
  } else if ('mediaDevices' in navigator) {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      let audioSource = null;
      let videoSource = null;

      devices.forEach((device) => {
        if (device.kind === 'audioinput') {
          audioSource = device.deviceId;
        } else if (device.kind === 'videoinput') {
          videoSource = device.deviceId;
        }
      });

      sourceSelected(audioSource, videoSource);
    })
      .catch((error) => {
        console.log(`${error.name}: ${error.message}`); // eslint-disable-line no-console
      });
  } else {
    MediaStreamTrack.getSources((sources) => {
      let audioSource = null;
      let videoSource = null;

      sources.forEach((source) => {
        if (source.kind === 'audio') {
          audioSource = source.id;
        } else if (source.kind === 'video') {
          videoSource = source.id;
        }
      });

      sourceSelected(audioSource, videoSource);
    });
  }

  Webcam.userMediaRequested = true;
}
