/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('preferences')) || {};
    this._settings = document.getElementById('settings');
    this._refreshRate = document.getElementById('refresh-rate');
    this._saveButton = document.getElementById('save-settings');
    this._swal = require('sweetalert2');

    this._refreshRate.addEventListener(
      'keyup',
      this.updateRefreshrate.bind(this)
    );
    this._refreshRate.addEventListener(
      'change',
      this.updateRefreshrate.bind(this)
    );

    this._saveButton.addEventListener('click', this.saveSettings.bind(this));

    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));

    document
      .querySelector('.fas.fa-times')
      .addEventListener('click', this.openSettings.bind(this));

    this._refreshRate.value = this.preferences.refreshRate;
  }

  /**
   * Opens preferences overlay.
   */
  openSettings() {
    const overlay = this._settings;
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
      this.disableButton();
      const value = e.target.value;
      input.value = value.substring(0, value.length - 1);
      return;
    }

    if (Number(this.preferences.refreshRate) !== refreshRate) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  /**
   * Saves preferences to local storage.
   */
  saveSettings() {
    const preferences = {
      refreshRate: this._refreshRate.value
    };

    localStorage.setItem('preferences', JSON.stringify(preferences));
    this.preferences = JSON.parse(localStorage.getItem('preferences'));

    this.disableButton();
    this.success('Okay!', 'Your changes got saved and applied.');
  }

  /**
   * Enables button.
   */
  enableButton() {
    const button = this._saveButton;

    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  }

  /**
   * Disabled button.
   */
  disableButton() {
    const button = this._saveButton;

    button.classList.add('disabled');
    button.setAttribute('disabled', '');
  }

  /**
   * Shows error message.
   */
  error() {}

  /**
   * Shows success message.
   */
  success(title, message) {
    const { getCurrentWindow } = require('electron').remote;
    const reload = () => getCurrentWindow().reload();

    this._swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Got it',
      onAfterClose: reload
    });
  }
}

export default Preferences;
