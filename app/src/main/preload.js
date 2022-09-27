const { contextBridge, ipcRenderer } = require('electron');

const windowLoaded = new Promise((resolve) => {
  window.onload = resolve;
})

console.log('Hello from main window preload');
