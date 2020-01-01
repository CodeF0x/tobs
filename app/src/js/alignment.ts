import { containerState, chartPosition } from './types';

class Alignment {
  public static nodes: Array<Element> = [
    ...document.getElementsByClassName('container')
  ];

  private static state: containerState = JSON.parse(
    localStorage.getItem('state')
  );

  /**
   * Saves the containers alignment
   */
  public static save() {
    const nodes = this.nodes;

    const state: { [index: string]: any } = {};

    nodes.forEach((container, index) => {
      const chart: chartPosition = {
        chartId: container.querySelector('.container-outer').id,
        containerId: container.id
      };
      state['chart' + index] = chart;
    });

    localStorage.setItem('state', JSON.stringify(state));
  }

  public static loggy() {
    console.log(JSON.parse(localStorage.getItem('state')));
  }
}

export default Alignment;
