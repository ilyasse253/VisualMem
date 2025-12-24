"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  desktopCapturer: {
    getSources: async (options) => {
      return await electron.ipcRenderer.invoke("desktop-capturer-get-sources", options);
    }
  },
  getProjectRoot: async () => {
    return await electron.ipcRenderer.invoke("get-project-root");
  }
});
