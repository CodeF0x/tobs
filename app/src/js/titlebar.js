/**
 * Custom titlebar.
 */
class Titlebar {
  constructor() {
    const { Titlebar, Color } = require('custom-electron-titlebar');
    const { Menu, MenuItem } = require('electron').remote;

    const self = this;

    self._titlebar = new Titlebar({
      backgroundColor: Color.fromHex('#002a4d'),
      icon: '../src/img/icons/icon.png'
    });
  }
}

export default Titlebar;
