/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('preferences')) || {};
    this.settings = document.getElementById('settings');
    this.refreshRate = document.getElementById('refresh-rate');
    this.swal = require('sweetalert2');

    this.refreshRate.addEventListener(
      'keyup',
      this.updateRefreshrate.bind(this)
    );

    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));

    document
      .querySelector('.fas.fa-times')
      .addEventListener('click', this.openSettings.bind(this));
  }

  /**
   * Opens preferences overlay.
   */
  openSettings() {
    const overlay = this.settings;
    const value = window.getComputedStyle(overlay).display;
    let overflow = document.body.style.overflowY;

    overlay.style.display = value === 'none' ? 'block' : 'none';

    if (overflow === '' || overflow === 'scroll') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }

  /**
   * Updates custom refreshrate.
   */
  updateRefreshrate(e) {
    const refreshRate = Number(e.target.value);

    if (refreshRate <= 0) {
      console.log('unter null');
      e.preventDefault();
      return;
    } else if (!Number.isInteger(refreshRate)) {
      console.log('kein int');
      e.preventDefault();
      return;
    }
  }

  /**
   * Saves preferences to local storage.
   */
  saveSettings() {
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
    this.success();
  }

  /**
   * Shows error message.
   */
  error() {}

  /**
   * Shows success message.
   */
  success() {}
}

export default Preferences;
