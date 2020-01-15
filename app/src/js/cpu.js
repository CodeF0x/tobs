class CPU {
  constructor(settings) {
    this._canvasElement = null;
    this._ctx = null;
    this._chart = null;
    this._settings = settings;
    this._sys = require('systeminformation');
    this._canvasElement = document.getElementById('cpu-chart');
    this._newData = [];
    this._newLables = [];
    this.init();
  }

  /**
   * Does the intial setup of the CPU chart, and other infos.
   */
  init() {
    /**
     * To measure CPU load, a period of time is needed (from start of application to end of application)
     * therefore currentLoad() needs to be called once at startup as a beginning point.
     */
    this._sys.currentLoad();

    this._sys
      .cpu()
      .then(info => {
        document.getElementById(
          'cpu-powerclock'
        ).innerText = `${info.speedmax} GHz`;
        document.getElementById('cpu-cores').innerText = info.cores;
      })
      .catch(err => console.error(err));

    this._sys
      .cpu()
      .then(info => {
        const cpuManufacturer = info.manufacturer;
        const cpuBrand = info.brand;
        document.getElementById(
          'headline-cpu'
        ).innerText = `${cpuManufacturer} ${cpuBrand}`;
      })
      .catch(err => console.error(err));

    this._ctx = this._canvasElement.getContext('2d');
    this._chart = new Chart(this._ctx, {
      type: 'line',
      data: {
        labels: ['0%'],
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
          ],
          xAxes: [
            {
              ticks: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: false
        },
        maintainAspectRatio: false
      }
    });
    this.update();
  }

  /**
   * Updates infos.
   */
  update() {
    setInterval(() => {
      this.updateChart();
    }, 1000);

    setInterval(() => {
      document.getElementById('cpu-usage').innerText = `(${
        this._newData[this._newData.length - 1]
      }%)`;

      this._sys
        .cpu()
        .then(info => {
          document.getElementById('cpu-clock').innerText = `${info.speed} GHz`;
        })
        .catch(err => console.error(err));

      this._chart.data.datasets[0].data = this._newData;
      this._chart.data.labels = this._newLables;
      this._chart.update(0);
    }, Number(this._settings.refreshRate) * 1000);
  }

  /**
   * Populates and updates the chart.
   */
  updateChart() {
    this._sys
      .currentLoad()
      .then(info => {
        const data = this._newData;

        if (data.length === 50) {
          data.shift();
          this._newLables.shift();
        }

        const percent = info.currentload.toFixed(0);

        data.push(percent);
        // Not shown, but chart.js needs it to update the chart properly
        this._newLables.push(percent + '%');
      })
      .catch(err => console.error(err));
  }
}

export default CPU;
