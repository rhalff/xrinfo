import { observable } from 'mobx';

const sensorStore = {
  accel: observable([0,0,0]),
  webcam: observable({
   format: 'mp4',
   uri: null
  })
};

setInterval(() => {
  sensorStore.accel[0]++;
  sensorStore.accel[1]++;
  sensorStore.accel[2]++;
}, 500);


export default sensorStore;
