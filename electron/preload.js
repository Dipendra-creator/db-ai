const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getVersion: () => ipcRenderer.invoke('app-version'),
  getPlatform: () => ipcRenderer.invoke('platform'),

  // Menu events
  onMenuAction: (callback) => {
    const validChannels = [
      'menu-new-connection',
      'menu-open-query',
      'menu-save-query',
      'menu-export-data',
      'menu-connect-database',
      'menu-disconnect-database',
      'menu-refresh-schema',
      'menu-about'
    ];

    validChannels.forEach(channel => {
      ipcRenderer.on(channel, callback);
    });

    // Return cleanup function
    return () => {
      validChannels.forEach(channel => {
        ipcRenderer.removeListener(channel, callback);
      });
    };
  },

  // File operations
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),

  // Database operations
  connectDatabase: (config) => ipcRenderer.invoke('db:connect', config),
  disconnectDatabase: () => ipcRenderer.invoke('db:disconnect'),
  executeQuery: (query) => ipcRenderer.invoke('db:query', query),
  getSchema: () => ipcRenderer.invoke('db:schema'),

  // Window operations
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),

  // Theme operations
  getTheme: () => ipcRenderer.invoke('theme:get'),
  setTheme: (theme) => ipcRenderer.invoke('theme:set', theme),

  // Notification
  showNotification: (title, body) => ipcRenderer.invoke('notification:show', title, body),

  // System info
  getSystemInfo: () => ipcRenderer.invoke('system:info'),

  // Development helpers
  isDev: process.env.NODE_ENV === 'development',
  
  // Remove listeners (cleanup)
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

// Expose a limited set of Node.js APIs for development
if (process.env.NODE_ENV === 'development') {
  contextBridge.exposeInMainWorld('devAPI', {
    openDevTools: () => ipcRenderer.invoke('dev:openDevTools'),
    reload: () => ipcRenderer.invoke('dev:reload')
  });
}

// Security: Log any attempts to access Node.js APIs directly
window.addEventListener('DOMContentLoaded', () => {
  console.log('DB-AI Desktop Application loaded');
  console.log('Electron version:', process.versions.electron);
  console.log('Chrome version:', process.versions.chrome);
  console.log('Node version:', process.versions.node);
});

// Prevent the renderer process from accessing Node.js APIs directly
delete window.require;
delete window.exports;
delete window.module;

// Security: Prevent eval and similar functions
window.eval = global.eval = function () {
  throw new Error('eval() is disabled for security reasons.');
};