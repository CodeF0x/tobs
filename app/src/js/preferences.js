/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('preferences')) || {};
    this.settings_ = document.getElementById('settings');
    this.refreshRate_ = document.getElementById('refresh-rate');
    this.saveButton_ = document.getElementById('save-settings');
    this.swal_ = require('sweetalert2');

    this.refreshRate_.addEventListener(
      'keyup',
      this.updateRefreshrate.bind(this)
    );

    this.saveButton_.addEventListener('click', this.saveSettings.bind(this));

    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));

    document
      .querySelector('.fas.fa-times')
      .addEventListener('click', this.openSettings.bind(this));

    this.refreshRate_.value = this.preferences.refreshRate;
  }

  /**
   * Opens preferences overlay.
   */
  openSettings() {
    const overlay = this.settings_;
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
      refreshRate: this.refreshRate_.value
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
    const button = this.saveButton_;

    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  }

  /**
   * Disabled button.
   */
  disableButton() {
    const button = this.saveButton_;

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

    this.swal_.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Got it',
      onAfterClose: reload
    });
  }
}

export default Preferences;
