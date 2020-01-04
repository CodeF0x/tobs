const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile('src/index.html');
});

app.on('window-all-closed', () => app.quit());
