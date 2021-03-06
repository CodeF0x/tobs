/**
 * Class representating disk data.
 */
class Disk {
  constructor(useGB, animations) {
    this._canvasElement = document.getElementById('disk-chart');
    this._chart = undefined;
    this._ctx = this._canvasElement.getContext('2d');
    this._sys = require('systeminformation');
    this._newData = [];
    this._newLables = [];
    this._useGb = useGB;
    this._chartDataLabels = require('chartjs-plugin-datalabels');
    this._i = 0;
    this._animations = animations ? true : false;
    this.init();
  }

  /**
   * Does the intial setup of the CPU chart, and other infos.
   */
  init() {
    this._sys
      .fsSize()
      .then(info => {
        const disks = info;
        const datasets = [];
        const unit = this._useGb ? 'GB' : 'GiB';

        const diskUsagePerDisk = disks.map(disk => {
          return {
            name: disk.fs,
            used: disk.used,
            size: disk.size
          };
        });

        diskUsagePerDisk.forEach(disk => {
          const dataset = {
            data: [
              this.convert(disk.size - disk.used),
              this.convert(disk.used)
            ],
            backgroundColor: ['rgb(32, 191, 107)', 'rgb(252, 92, 101)'],
            label: disk.name
          };

          datasets.push(dataset);
        });

        this._chart = new Chart(this._ctx, {
          plugins: [this._chartDataLabels],
          type: 'pie',
          data: {
            datasets: datasets,
            labels: [`Free in ${unit}`, `Used in ${unit}`]
          },
          options: {
            plugins: {
              datalabels: {
                formatter: (value, context) => {
                  const name = diskUsagePerDisk[context.datasetIndex].name;
                  const index = context.dataIndex;

                  if (index === 0) {
                    return name;
                  } else {
                    return '';
                  }
                }
              }
            },
            responsive: true,
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Disk usage per disk'
            },
            animation: {
              animateScale: this._animations,
              animateRotate: this._animations
            }
          }
        });
      })
      .catch(err => console.error(err));
  }

  /**
   * Converts bytes to either GB or GiB
   */
  convert(value) {
    const factor = this._useGb ? 1000 : 1024;
    return (value / factor / factor / factor).toFixed(2);
  }
}

export default Disk;
