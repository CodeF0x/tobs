// In the end it's a js file, that's why .js
import AppContainer from '../components/app-container/container.js';

interface ComponentHelperObject {
  componentName: string;
  class: Function;
}

const registerComponents = () => {
  const components: ComponentHelperObject[] = [
    { componentName: 'app-container', class: AppContainer }
  ];

  components.forEach(component => {
    customElements.define(component.componentName, component.class);
  });
};

export default registerComponents;
