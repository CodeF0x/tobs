import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const window: BrowserWindow = new BrowserWindow();
  window.loadFile('src/index.html');
});

app.on('window-all-closed', () => app.quit());
