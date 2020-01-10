/**
 * Adjustable preferences.
 */
class Preferences {
  constructor() {
    this.constants = JSON.parse(localStorage.getItem('preferences')) || {};
    this.settings = document.getElementById('settings');
    document
      .getElementById('settings-button')
      .addEventListener('click', this.openSettings.bind(this));
  }

  openSettings() {
    const overlay = this.settings;
    const value = window.getComputedStyle(overlay).display;

    overlay.style.display = value === 'none' ? 'block' : 'none';
  }
}

export default Preferences;
