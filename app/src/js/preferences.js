/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('preferences')) || {
      refreshRate: 1,
      animations: false,
      useGB: false,
      theme: 'dark'
    };

    this._settings = document.getElementById('settings');
    this._refreshRate = document.getElementById('refresh-rate');
    this._animationsCheckbox = document.getElementById('animations');
    this._unitCheckbox = document.getElementById('gb-gib');
    this._darkTheme = document.getElementById('dark-theme');
    this._lightTheme = document.getElementById('light-theme');
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

    this._unitCheckbox.addEventListener('change', this.toggleUnits.bind(this));

    this._saveButton.addEventListener('click', this.saveSettings.bind(this));

    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));

    document
      .querySelector('.fas.fa-times')
      .addEventListener('click', this.openSettings.bind(this));

    this._darkTheme.addEventListener('change', this.toggleTheme.bind(this));
    this._lightTheme.addEventListener('change', this.toggleTheme.bind(this));

    this._refreshRate.value = this.preferences.refreshRate;
    this._animationsCheckbox.checked = this.preferences.animations;
    this._unitCheckbox.checked = this.preferences.useGB;

    if (this.preferences.theme === 'dark') {
      this._darkTheme.checked = true;
    } else {
      this._lightTheme.checked = true;
    }

    this.checkForUpdateAndNotify();
  }

  /**
   * Opens preferences overlay.
   */
  openSettings() {
    const overlay = this._settings;
    const value = window.getComputedStyle(overlay).display;
    const container = document.querySelector('.container-after-titlebar');
    let overflow = container.style.overflowY;

    overlay.style.display = value === 'none' ? 'block' : 'none';

    if (overflow === '' || overflow === 'scroll') {
      container.style.overflowY = 'hidden';
      overlay.style.top = `${container.scrollTop}px`;
    } else {
      container.style.overflowY = 'scroll';
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
   * Toggles between GB and GiB.
   */
  toggleUnits() {
    const toggle = this._unitCheckbox;
    const useGB = this.preferences.useGB;

    if (toggle.checked && !useGB) {
      this.enableButton();
    } else if (!toggle.checked && useGB) {
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
      animations: this._animationsCheckbox.checked,
      useGB: this._unitCheckbox.checked,
      theme: this._darkTheme.checked ? 'dark' : 'light'
    };

    localStorage.setItem('preferences', JSON.stringify(preferences));

    this.disableButton();
    this.success('Okay!', 'Your changes got saved and applied.');
  }

  /**
   * Toggles between dark- and light theme.
   */
  toggleTheme() {
    const theme = this.preferences.theme;

    if (theme === 'dark' && this._darkTheme.checked) {
      this.disableButton();
    } else if (theme === 'dark' && this._lightTheme.checked) {
      this.enableButton();
    } else if (theme === 'light' && this._lightTheme.checked) {
      this.disableButton();
    } else if (theme === 'light' && this._darkTheme.checked) {
      this.enableButton();
    }
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

  /**
   * Checks if there's an update available.
   */
  async checkForUpdateAndNotify() {
    try {
      const latest = require('github-latest-release');
      const version = require('electron').remote.app.getVersion();

      const newestVersion = await latest('CodeF0x', 'tobs');

      if (`v${version}` !== newestVersion.name) {
        if (this.preferences.ignoredRelease === newestVersion.name) {
          return;
        } else {
          this._swal
            .fire({
              title: 'New version available!',
              text:
                'A new version of Tobs is available. Do you want to download it?',
              icon: 'info',
              confirmButtonText: 'Yes',
              showCancelButton: true,
              cancelButtonText: 'Not now'
            })
            .then(result => {
              if (result.value) {
                require('electron').shell.openExternal(
                  'https://github.com/CodeF0x/tobs/releases/latest'
                );
              }
            });
        }
      }
    } catch (e) {
      throw new Error('Could not get latest release from GitHub.');
    }
  }
}

export default Preferences;
