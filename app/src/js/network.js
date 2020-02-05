class Network {
  constructor(animations) {
    this._canvasElement = document.getElementById('network-chart');
    this._ctx = null;
    this._chart = null;
    this._sys = require('systeminformation');
    this._newData = [];
    this._newLables = [];
    this._animations = animations;
    this.init();
  }

  /**
   * Does the initial setup of the network chart, and other infos.
   */
  async init() {
    const networkInterfaces = await this._sys.networkInterfaces();
    const defaultInterfacename = await this._sys.networkInterfaceDefault();
    const defaultInterface = networkInterfaces.filter(networkInterface => networkInterface.ifaceName === defaultInterfacename)[0];

    document.getElementById('network-interface-name').innerText = defaultInterface.ifaceName;
    document.getElementById('ipv4-address').innerText = defaultInterface.ip4;
    document.getElementById('ipv6-address').innerText = defaultInterface.ip6;
    document.getElementById('mac-address').innerText = defaultInterface.mac;
    document.getElementById('network-interface-type').innerText = `(${defaultInterface.type})`;
    
  }
}

export default Network;