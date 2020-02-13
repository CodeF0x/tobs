class RAM {
  constructor(useGB, animations) {
    this._canvasElement = document.getElementById('ram-chart');
    this._ctx = null;
    this._chart = null;
    this._factor = useGB ? 1000 : 1024;
    this._animations = animations;
    this._sys = require('systeminformation');
    this._newData = new Array(50).fill(0);
    this._newLables = [...this._newData];
    this.init();
  }

  /**
   * Does the initial setup of the RAM chart, and other infos.
   */
  init() {
    this._sys
      .mem()
      .then(info => {
        const factor = this._factor;
        const totalBytes = info.total;
        const totalConverted = totalBytes / factor / factor / factor;
        const prefix = factor === 1024 ? 'GiB' : 'GB';

        document.getElementById(
          'ram-total'
        ).innerText = `${totalConverted.toFixed(2)} ${prefix}`;
      })
      .catch(err => console.error(err));

    this._sys
      .memLayout()
      .then(info => {
        document.getElementById(
          'headline-ram'
        ).innerText = `${info[0].manufacturer} ${info[0].partNum}`;

        document.getElementById(
          'ram-clock'
        ).innerText = `${info[0].clockSpeed} MHz`;

        document.getElementById('ram-type').innerText = info[0].type;
      })
      .catch(err => console.error(err));

    this._ctx = this._canvasElement.getContext('2d');
    this._chart = new Chart(this._ctx, {
      type: 'line',
      data: {
        label: ['0%'],
        datasets: [
          {
            label: 'RAM usage in %',
            data: [0],
            backgroundColor: 'rgba(0, 102, 255, 0.2)',
            borderColor: 'rgba(51, 102, 255, 1)',
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
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });

    setInterval(() => {
      this.updateChart();
    }, 1000);
  }

  /**
   * Updates infos.
   */
  update() {
    document.getElementById('ram-usage').innerText = `(${
      this._newData[this._newData.length - 1]
    }%)`;

    this._sys.mem().then(info => {
      const factor = this._factor;
      const prefix = factor === 1024 ? 'GiB' : 'GB';
      const totalConverted = (info.total / factor / factor / factor).toFixed(2);
      const usedConverted = (info.used / factor / factor / factor).toFixed(2);
      const freeConverted = (totalConverted - usedConverted).toFixed(2);

      document.getElementById(
        'ram-used'
      ).innerText = `${usedConverted} ${prefix}`;

      document.getElementById(
        'ram-free'
      ).innerText = `${freeConverted} ${prefix}`;
    });

    this._chart.data.datasets[0].data = this._newData;
    this._chart.data.labels = this._newLables;
    this._chart.update(this._animations === true ? 1000 : 0);
  }

  /**
   * Populates the chart.
   */
  updateChart() {
    this._sys
      .mem()
      .then(info => {
        const factor = this._factor;
        const data = this._newData;
        if (data.length === 50) {
          data.shift();
          this._newLables.shift();
        }

        const usedConverted = info.used / factor / factor / factor;
        const totalConverted = info.total / factor / factor / factor;
        const percent = (usedConverted / (totalConverted / 100)).toFixed(0);
        data.push(percent);
        // Not shown, but chart.js needs it to update the chart properly
        this._newLables.push(percent + '%');
      })
      .catch(err => console.error(err));
  }
}

export default RAM;
