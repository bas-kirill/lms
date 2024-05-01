import { app, BrowserWindow } from 'electron';
import path from 'path';

// Electron Forge automatically creates these entry points
declare const LOGIN_WEBPACK_ENTRY: string;
declare const LOGIN_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: LOGIN_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(LOGIN_WEBPACK_ENTRY);

  appWindow.on('ready-to-show', () => appWindow.show());

  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}
