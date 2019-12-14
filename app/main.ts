import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const window: BrowserWindow = new BrowserWindow();
  window.loadFile('src/index.html');
});
