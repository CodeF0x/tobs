# Please refer to the bottom of this readme regarding the state of development. This readme is subject to change.

<br>
<div align="center">
<br>
  <a href="https://github.com/codef0x/tobs">
    <img width="500" src="https://i.imgur.com/DrYVPC8.png">
  </a>
  <br>
  <br>

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/codef0x/tobs?include_prereleases)

![GitHub last commit](https://img.shields.io/github/last-commit/codef0x/tobs)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

  <br>

![GitHub All Releases](https://img.shields.io/github/downloads/codef0x/tobs/total)
![GitHub closed issues](https://img.shields.io/github/issues-closed/codef0x/tobs)
![GitHub issues](https://img.shields.io/github/issues/codef0x/tobs)

  <h1>TOBS</h1>
  <p>
    A customizable system monitoring app for Mac and Windows.
  </p>
</div>

## Table of Contents

1. [What is TOBS?](#what)
2. [Features](#features)
3. [Customizing TOBS](#customizing)
4. [Screenshots](#screenshots)
5. [Installation](#install)
6. [Known Issues](#known-issues)
7. [State of development](#state)
8. [Support](#support)
9. [Special Thanks](#special-thanks-to)

<h2 align="center" id="what">What is TOBS?</h2>

### TOBS is a customizable cross-platform system monitor app.

It shows you the most important information about your system in an instant using comprehensible charts.<br>
With customizable options like refreshrate, dark- and light mode, drag- and drop alignment of the charts and some more, you can make Tobs your very own experience.
<br>
<br>

<hr>
<h2 align="center" id="features">Features</h2>

### CPU Monitoring

**Tobs is able to display the following CPU data:**

- CPU Name
- Current clock speed
- Power clock speed
- Usage in %
- Cores (logical)
- CPU model and vendor

### RAM Monitoring

**Tobs is able to display the following CPU data:**

- Memory Name
- Usage in %
- Total memory available
- Used memory
- Free memory
- Memory clock
- Memory type

### GPU Monitoring

**Tobs is able to display the following GPU data:**

- GPU name
- Total VRAM
- Bus
- [Why is there not more information?](#known-issues)

### Disk Monitoring

**Tobs is able to display the following GPU data:**

- Free space per disk
- Used space per disk
- Mounted disks

### Network Monitoring

**Tobs is able to display the following network data:**<br>
_Note: This data applies only to the default interface_

- Connection Name
- IPv4 address
- IPv6 address
- MAC address
- Current upload speed in MBit (Megabit)
- Current download speed in MBit (Megabit)
  <br><br>
  <hr>
  <h2 align="center" id="customizing">Customizing TOBS</h2>

**TOBS is almost fully customizable. You are able to adjust the following settings:**

- Refreshrate of data
- Select if data shall be displayed in GiB (Gibibyte) or GB (Gigabyte)
- Switch between Dark- and Light mode
- Chartlayout customizable with drag and drop
  <br><br>
  <hr>
  <h2 align="center" id="screenshots">Screenshots</h2>

**This is what TOBS looks like in action**

<div align="center">
<img width="350" src="https://i.imgur.com/qgolzY9.png"> <img width="350" src="https://i.imgur.com/QReH5Yz.png"><br>
<img width="350" src="https://i.imgur.com/M31glsz.png"> <img width="350" src="https://i.imgur.com/ypLn8GR.png"><br>
<img width="350" src="https://i.imgur.com/LPDdMZx.png">
</div>
<br>
<hr>
<h2 align="center" id="install">Installing TOBS</h2>

**The TOBS installation is pretty straigt forward.**

To get started, download the latest [release](https://github.com/CodeF0x/tobs/releases) or clone the master to your computer.

**_Make sure you have Node installed!_**

Open an Commandprompt/Terminal inside the TOBS folder and run _npm install_.

After that, use _npm start_ to launch TOBS.

<hr>
<h2 align="center" id="known-issues">Known issues and drawbacks</h2>

**Just like with every piece of software, TOBS also has some known issues and drawbacks.**

- You can't monitor your graphics card with TOBS, as it lacks a proper API to get GPU data. The only information TOBS can display about your GPU are:

  - GPU name
  - Total VRAM
  - Bus

- Due to Linux's permission system, there is no direct Linux support right now. Technically, TOBS should run on Linux, but with issues (e. g. missing / incorrect data, etc.)
  <br><br>
  <hr>
  <h2 align="center" id="state">State of development</h2>

**This displays the current state of development.**

### Features:

| Planned Feature | Implemented                                                                                   | Working as intended / Tested |
| --------------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| CPU usage       | ✅                                                                                            | ❌                           |
| RAM usage       | ✅                                                                                            | ❌                           |
| GPU usage       | ❓ [Learn more](https://github.com/CodeF0x/tobs/wiki/Hardly-any-GPU-stats-or-wrong-GPU-stats) | ❌                           |
| disk usage      | ✅                                                                                            | ❌                           |
| network usage   | ✅                                                                                            | ❌                           |

### Customizing:

| Preference                                | Implemented      | Working as intended / Tested |
| ----------------------------------------- | ---------------- | ---------------------------- |
| chart layout via drag & drop              | ✅               | ❌                           |
| custom refreshrate of charts              | ✅               | ❌                           |
| measurements in GiB or GB                 | ✅               | ❌                           |
| set dark or light mode on the fly         | ✅               | ❌                           |
| self updating or atleast update assistent | ❓ Update dialog | ❌                           |
| enable / disable animated charts          | ✅               | ❌                           |

<br>
<hr>
<h2 align="center" id="support">Support</h2>

If you have discovered a 🐜 or have a feature suggestion, feel free to create an issue on Github.

### License

This project is lincensed under the MIT License.
<br><br>

<hr>
<h2 align="center" id="specialthanks">Special Thanks to</h2>
<p align="center">(In chronological order)</p>

- [miit0o](https://github.com/miit0o) for creating this great looking README.
