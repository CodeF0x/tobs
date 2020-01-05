import Alignment from './alignment.js';
import CPU from './cpu.js';

document.addEventListener('DOMContentLoaded', () => {
  Alignment.init();
  new CPU();
  // Because Typescript and dragula both refuse to work together, good ol' require
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
