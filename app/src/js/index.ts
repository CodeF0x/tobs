// Because Typescript and dragula both refuse to work together, good ol' require
const dragula = require('dragula');
dragula([...document.getElementsByClassName('container')]);
