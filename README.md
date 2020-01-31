# Please refer to the bottom of this readme regarding the state of development. This readme is subject to change.

## Tobs is a customizable cross-platform system monitor app.

It shows you the most important information about your system in an instant using comprehensible charts.
<br>
With customizable options like refreshrate, dark- and light mode, drag- and drop alignment of the charts and some more, you can make Tobs your very own experience.

- <a href="#information">data available with Tobs</a>
- <a href="#customization">customizable options</a>
- <a href="#screenshots">screenshots</a>
- <a href="#issues">known issues and drawbacks</a>
- <a href="#state-of-development">state of development</a>

<h3 id="information">You can use Tobs to monitor:</h3>

- CPU
  - CPU name
  - current clock speed
  - powerclock speed
  - usage in %
  - cores (logical)
  - CPU model and vendor
- RAM
  - RAM name
  - usage in %
  - total
  - used
  - free
  - clock
  - type
- GPU
  - GPU name
  - total VRAM
  - bus
  - [why not more infos?](https://github.com/CodeF0x/tobs/wiki/Hardly-any-GPU-stats-or-wrong-GPU-stats)
- disk(s)
  - details will follow
- network
  - details will follow

<h3 id="customization">You are able to customize</h3>

- refreshrate of data
- information in GiB (Gibibyte) or GB (Gigabyte)
- dark- and light mode
- chart layout via drag & drop

<h3 id="screenshots">Screenshots</h3>

None, app isn't finished yet.

<h3 id="issues">Known issues and drawbacks</h3>

- you can't monitor your graphics card with Tobs, as it lacks a proper API to get GPU data. The only information Tobs can tell you about your GPU are:
  - name
  - total vram (might also be incorrect)
  - GPU bus
- due to Linux's permission system, there is no direct Linux support right now. Technically, Tobs **should** run on Linux, but with issues (e. g. missing / incorrect data, etc.)

<h2 id="state-of-development">State of development</h2>

<h2>Features</h2>

| Planned Feature | Implemented | Working as intended / Tested |
| --------------- | ----------- | ---------------------------- |
| CPU usage       | ✅          | ❌                           |
| RAM usage       | ✅          | ❌                           |
| GPU usage       | ❓          | ❌                           |
| disk usage      | ❌          | ❌                           |
| network usage   | ❌          | ❌                           |

<h2>Customizable options</h2>

| Preference                                | Implemented | Working as intended / Tested |
| ----------------------------------------- | ----------- | ---------------------------- |
| chart layout via drag & drop              | ✅          | ❌                           |
| custom refreshrate of charts              | ✅          | ❌                           |
| measurements in GiB or GB                 | ✅          | ❌                           |
| set dark or light mode on the fly         | ❌          | ❌                           |
| self updating or atleast update assistent | ❌          | ❌                           |
| enable / disable animated charts          | ✅          | ❌                           |
