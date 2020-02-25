/**
 * Custom titlebar.
 */
class Titlebar {
  constructor(theme) {
    const { Titlebar, Color } = require('custom-electron-titlebar');
    const { Menu, MenuItem } = require('electron').remote;
    
    const color = theme === 'dark' ? '#343436' : '#9b9b9b';

    this._titlebar = new Titlebar({
      backgroundColor: Color.fromHex(color),
      icon: '../src/img/icons/icon.png'
    });

     /**
     * Because the titlebar inserts a new div that serves as the body, 
     * this new "body" needs to have some CSS properties set so that
     * the settings overlay can work properly.
     */
    const body = document.querySelector('.container-after-titlebar');
    body.style.overflow = '';
    body.style.overflowY = 'scroll';

    /**
     * Becuase the custom titlebar has different height on Windows and Mac,
     * this class has to correct the top-padding of the settings overlay.
     */
    document.getElementById('settings').style.paddingTop = document.querySelector('.titlebar').style.height;
  }
}

export default Titlebar;
