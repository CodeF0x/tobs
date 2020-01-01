import Alignment from './alignment.js';

document.addEventListener('DOMContentLoaded', () => {
  // Because Typescript and dragula both refuse to work together, good ol' require
  const dragula = require('dragula');
  dragula([...document.getElementsByClassName('container')]).on(
    'drop',
    (
      el: HTMLElement,
      target: HTMLElement,
      source: HTMLElement,
      sibling: HTMLElement
    ) => {
      const toSwap = target.querySelectorAll('.container-outer')[1];
      source.appendChild(toSwap);
      Alignment.save();
      Alignment.loggy();
    }
  );
});
