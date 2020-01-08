class CPU {
  constructor() {
    this._canvasElement = null;
    this._ctx = null;
    this._chart = null;
    this._sys = require('systeminformation');
    this._canvasElement = document.getElementById('cpu-chart');
    this.init();
  }

  init() {
    /**
     * To measure CPU load, a period of time is needed (from start of application to end of application)
     * therefore currentLoad() needs to be called once at startup as a beginning point.
     */
    this._sys.currentLoad();

    this._ctx = this._canvasElement.getContext('2d');
    this._chart = new Chart(this._ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'CPU usage in %',
            data: [0],
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
        },
        tooltips: {
          enabled: false
        }
      }
    });
    this.update();
  }

  async update() {
    setInterval(() => {
      console.log('running');
      let newProcent = null;

      this._sys
        .currentLoad()
        .then(data => this.updateChart(data.currentload))
        .catch(err => console.error(err));

      //this.updateChart(newProcent);
    }, 1500);
  }

  updateChart(data) {
    const chart = this._chart;
    const datasets = chart.data.datasets;

    datasets.forEach(dataset => {
      dataset.data.push(data);

      if (dataset.data.length === 30) {
        dataset.data.shift();
      }
    });

    this._chart.update();
  }
}

export default CPU;
