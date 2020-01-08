class CPU {
  _canvasElement = null;
  _ctx = null;
  _chart = null;
  _sys = require('systeminformation');

  constructor() {
    this._canvasElement = document.getElementById('cpu-chart');
    this.init();
  }

  init() {
    /**
     * To measure cpu load, a period of time is needed (from start of application to end of application)
     * therefore currentLoad() needs to be called once at startup as a beginning point.
     */
    this._sys.currentLoad();

    this._ctx = this._canvasElement.getContext('2d');
    this._chart = new Chart(this._ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10,
                suggestedMax: 100
              }
            }
          ]
        }
      }
    });
    this.update();
  }

  async update() {}

  updateChart(label, data) {
    const chart = this._chart;
  }
}

export default CPU;
