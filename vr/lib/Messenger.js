import EventEmitter from 'eventemitter3';

class Messenger extends EventEmitter {
  constructor() {
    super();
    this._onMainWindowMessage = this._onMainWindowMessage.bind(this);
  }

  start() {
    console.log('START LISTENING');
    window.addEventListener('message', this._onMainWindowMessage);
  }

  stop() {
    window.removeEventListener('message', this._onMainWindowMessage);
  }

  static create() {
    return new Messenger();
  }

  _onMainWindowMessage(event) {
    const data = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;

    if (data.type) {
      console.log('emitting', data.type);
      this.emit(data.type, data.payload);
    }
  }
}

export default Messenger.create();

