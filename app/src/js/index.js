import Alignment from './alignment.js';
import CPU from './cpu.js';
import Preferences from './preferences.js';

document.addEventListener('DOMContentLoaded', () => {
  Alignment.init();
  new Preferences();
  new CPU();
  const dragula = require('dragula');
  dragula([...document.getElementsByClassName('container')]).on(
    'drop',
    (el, target, source, sibling) => {
      const toSwap = target.querySelectorAll('.container-outer')[1];
      source.appendChild(toSwap);
      Alignment.save();
    }
  );
});