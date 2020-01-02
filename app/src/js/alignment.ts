import { chartPosition } from './types';

/**
 * Manges persistent drag and drop of charts.
 */
class Alignment {
  public static nodes: Array<Element> = [
    ...document.getElementsByClassName('container')
  ];

  private static state: { [index: string]: any } = JSON.parse(
    localStorage.getItem('state')
  );

  /**
   * Saves the alignment of the containers.
   */
  public static save(): void {
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

  /**
   * Places the containers at the proper position at app start.
   */
  public static init(): void {
    const state = this.state;

    for (const chart in state) {
      console.log(state[chart]);
      const container: Element = document.getElementById(
        state[chart].containerId
      );
      const chartContainer: Element = document.getElementById(
        state[chart].chartId
      );

      container.appendChild(chartContainer);
    }
  }
}

export default Alignment;
