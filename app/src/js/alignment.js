/**
 * Manges persistent drag and drop of charts.
 */
class Alignment {
  static _nodes_ = [...document.getElementsByClassName('container')];

  static _state = JSON.parse(localStorage.getItem('state'));

  /**
   * Saves the alignment of the containers.
   */
  static save() {
    const nodes = this._nodes;

    const state = {};

    nodes.forEach((container, index) => {
      const chart = {
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
  static init() {
    const state = this._state;

    for (const chart in state) {
      const container = document.getElementById(state[chart].containerId);
      const chartContainer = document.getElementById(state[chart].chartId);

      container.appendChild(chartContainer);
    }
  }
}

export default Alignment;
