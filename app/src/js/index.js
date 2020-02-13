import Alignment from './alignment.js';
import CPU from './cpu.js';
import Preferences from './preferences.js';
import RAM from './ram.js';
import GPU from './gpu.js';
import Disk from './disk.js';
import Network from './network.js';
import Theme from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  Alignment.init();
  const preferences = new Preferences().preferences;
  const cpu = new CPU(preferences.animations);
  const ram = new RAM(preferences.useGB, preferences.animations);
  const gpu = new GPU(preferences.useGB);
  const disk = new Disk(preferences.useGB, preferences.animations);
  const network = new Network(preferences.animations);
  const theme = new Theme(preferences.theme);

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
    network.update();
  }, preferences.refreshRate * 1000);
});
