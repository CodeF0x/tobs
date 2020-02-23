const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'hidden',
    frame: false
  });
  window.loadFile('src/index.html');
});

app.on('window-all-closed', () => app.quit());
