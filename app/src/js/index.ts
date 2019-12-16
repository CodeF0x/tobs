import registerComponents from './register-components.js';
import * as Drake from 'dragula';

registerComponents();

const dragNDropElements: Element[] = [
  ...document.getElementsByName('app-container')
];
Drake(dragNDropElements);
