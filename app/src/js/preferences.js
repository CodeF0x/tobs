/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('preferences')) || {};
    this._settings = document.getElementById('settings');
    this._refreshRate = document.getElementById('refresh-rate');
    this._animationsCheckbox = document.getElementById('animations');
    this._saveButton = document.getElementById('save-settings');
    this._showConfirmBox = true; // <- Very ugly way of preventing the toggle switch to fire two confirm boxes in a row when toggling to on and then toggling back to off
    this._swal = require('sweetalert2');

    this._refreshRate.addEventListener(
      'keyup',
      this.updateRefreshrate.bind(this)
    );
    this._refreshRate.addEventListener(
      'change',
      this.updateRefreshrate.bind(this)
    );

    this._animationsCheckbox.addEventListener(
      'change',
      this.toggleAnimations.bind(this)
    );

    this._saveButton.addEventListener('click', this.saveSettings.bind(this));

    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));

    document
      .querySelector('.fas.fa-times')
      .addEventListener('click', this.openSettings.bind(this));

    this._refreshRate.value = this.preferences.refreshRate;
    this._animationsCheckbox.checked = this.preferences.animations;
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
      overlay.style.top = `${window.scrollY}px`;
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
   * Enables / disables animations.
   */
  toggleAnimations() {
    const toggle = this._animationsCheckbox;
    const showBox = this._showConfirmBox;

    // animations are disabled -> user checks button to enable
    if (toggle.checked && showBox) {
      this._swal
        .fire({
          title: 'Enable animations?',
          text: 'This might cause some graphical glitches of the charts.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'I understand'
        })
        .then(result => {
          if (result.value) {
            this.enableButton();
            this._showConfirmBox = false;
          } else {
            this.disableButton();
            toggle.checked = false;
            this._showConfirmBox = true;
          }
        });
      // animations are enabled -> user checks button to disable
    } else if (!toggle.checked && showBox) {
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
      refreshRate: Number(this._refreshRate.value),
      animations: this._animationsCheckbox.checked
    };

    localStorage.setItem('preferences', JSON.stringify(preferences));

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
    this._swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Got it',
      onAfterClose: this.reloadAndApply
    });
  }

  /**
   * Reloads the application so that changes get applied.
   */
  reloadAndApply() {
    const { getCurrentWindow } = require('electron').remote;
    getCurrentWindow().reload();
  }
}

export default Preferences;
