class GPU {
  constructor(useGB) {
    this._sys = require('systeminformation');
    this._useGB = useGB;
    this.init();
  }

  /**
   * Does the initial setup.
   */
  init() {
    this._sys.graphics().then(info => {
      const gpu = info.controllers[0];
      document.getElementById('headline-gpu').innerText = `${gpu.model}`;

      let vram = null;

      if (this._useGB) {
        vram = (gpu.vram / 1000).toFixed(2).toString() + ' GB';
      } else {
        vram =
          ((gpu.vram * 1000 * 1000) / 1024 / 1024 / 1024)
            .toFixed(2)
            .toString() + ' GiB';
      }

      document.getElementById('gpu-vram').innerText = vram;

      document.getElementById('gpu-bus').innerText = gpu.bus;

      document.getElementById('gpu-info-link').addEventListener('click', e => {
        e.preventDefault();

        require('electron').shell.openExternal(e.target.href);
      });
    });
  }
}

export default GPU;
