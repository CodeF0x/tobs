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
    const input = e.target;
    const refreshRate = Number(input.value);

    if (refreshRate <= 0 || !Number.isInteger(refreshRate)) {
      const value = e.target.value;
      input.value = value.substring(0, value.length - 1);
      return;
    }

    this.markButtonAsClickable();
  }

  /**
   * Saves preferences to local storage.
   */
  saveSettings() {
    localStorage.setItem('preferences', JSON.stringify(this.preferences));
    this.success();
  }

  /**
   * Makes save-settings-button clickable for user.
   */
  markButtonAsClickable() {}

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
