'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as fs from 'fs';
import { format as formatUrl } from 'url'
import {startServer} from './server';
// import * as _ from './preload';

const isDevelopment = process.env.NODE_ENV !== 'production'
const serve = isDevelopment;

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: true,  // false if you want to run e2e test with Spectron
      preload: path.resolve(__dirname, "preload.js"),
    }
  });

  if (serve) {
    window.webContents.openDevTools()
    window.loadURL(`http://127.0.0.1:7200`);
  }
  else {
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, './dist/angular/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/angular/index.html';
    }

    window.loadURL(formatUrl({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  setTimeout(createMainWindow, 400);
  startServer();
})
