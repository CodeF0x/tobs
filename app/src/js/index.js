import Alignment from './alignment.js';
import CPU from './cpu.js';
import Preferences from './preferences.js';
import RAM from './ram.js';

document.addEventListener('DOMContentLoaded', () => {
  Alignment.init();
  const preferences = new Preferences().preferences;
  const cpu = new CPU(preferences.animations);
  const ram = new RAM(preferences.useGB, preferences.animations);

  const dragula = require('dragula');
  dragula([...document.getElementsByClassName('container')]).on(
    'drop',
    (el, target, source, sibling) => {
      const toSwap = target.querySelectorAll('.container-outer')[1];
      source.appendChild(toSwap);
      Alignment.save();
    }
  );

  setInterval(() => {
    cpu.update();
    ram.update();
  }, preferences.refreshRate * 1000);
});
