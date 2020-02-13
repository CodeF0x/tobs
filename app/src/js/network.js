class Network {
  constructor(animations) {
    this._canvasElement = document.getElementById('network-chart');
    this._ctx = null;
    this._chart = null;
    this._sys = require('systeminformation');
    this._newDataDown = new Array(50).fill(0);
    this._newLablesDown = [...this._newDataDown];
    this._newDataUp = [...this._newDataDown];
    this._newLablesUp = [...this._newDataDown];
    this._animations = animations;
    this.init();
  }

  /**
   * Does the initial setup of the network chart, and other infos.
   */
  async init() {
    /**
     * To measure network load, a period of time is needed (from start of application to end of application)
     * therefore networkStats() needs to be called once at startup as a beginning point.
     */
    this._sys.networkStats();

    const networkInterfaces = await this._sys.networkInterfaces();
    const defaultInterfacename = await this._sys.networkInterfaceDefault();
    const defaultInterface = networkInterfaces.filter(
      networkInterface => networkInterface.iface === defaultInterfacename
    )[0];

    document.getElementById('network-interface-name').innerText =
      defaultInterface.ifaceName;
    document.getElementById('ipv4-address').innerText = defaultInterface.ip4;
    document.getElementById('ipv6-address').innerText = defaultInterface.ip6;
    document.getElementById('mac-address').innerText = defaultInterface.mac;
    document.getElementById(
      'network-interface-type'
    ).innerText = `(${defaultInterface.type})`;

    this._ctx = this._canvasElement.getContext('2d');
    this._chart = new Chart(this._ctx, {
      type: 'line',
      data: {
        labels: ['Upload', 'Download'],
        datasets: [
          {
            label: 'Upload in MBit/s',
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            data: [0],
            borderWidth: 1,
            borderDash: [1, 2]
          },
          {
            label: 'Download in MBit/s',
            backgroundColor: 'rgba(255, 200, 132, 0.2)',
            borderColor: 'rgba(255, 99, 200, 132)',
            data: [1],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              return '';
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 10,
                suggestedMax: defaultInterface.speed
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
   * Updates the infos.
   */
  update() {
    const dataDown = this._newDataDown;
    const dataUp = this._newDataUp;

    document.getElementById('download-speed-second').innerText = `${dataDown[dataDown.length - 1]} MBit/s`;
    document.getElementById('upload-speed-second').innerText = `${dataUp[dataUp.length - 1]} MBit/s`;

    this._chart.data.labels = this._newLablesUp;

    this._chart.data.datasets[0].data = dataUp;
    this._chart.data.datasets[0].labels = this._newLablesUp;

    this._chart.data.datasets[1].data = dataDown;
    this._chart.data.datasets[1].labels = this._newLablesDown;

    this._chart.update(this._animations ? 1000 : 0);
  }

  /**
   * Populates the chart.
   */
  async updateChart() {
    const defaultNetworkInterface = await this._sys.networkInterfaceDefault();
    this._sys
      .networkStats(defaultNetworkInterface)
      .then(info => {
        info = info[0];
        const dataUp = this._newDataUp;
        const dataDown = this._newDataDown;

        if (dataUp.length === 50) {
          dataUp.shift();
          this._newLablesUp.shift();
        } 
        
        if (dataDown.length === 50) {
          dataDown.shift();
          this._newLablesDown.shift();
        }

        const mbitsDown = ((info.rx_sec * 8) / 1000 / 1000).toFixed(2);
        const mbitsUp = ((info.tx_sec * 8) / 1000 / 1000).toFixed(2);

        dataUp.push(mbitsUp);
        this._newLablesUp.push(mbitsUp + ' MBits/s');

        dataDown.push(mbitsDown);
        this._newLablesDown.push(mbitsDown + ' MBits/s');
      })
      .catch(err => console.error(err));
  }
}

export default Network;
