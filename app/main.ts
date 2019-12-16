const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const window = new BrowserWindow();
  window.loadFile('src/index.html');
});

app.on('window-all-closed', () => app.quit());
