// preload.js
const { contextBridge, ipcRenderer } = require("electron");

// 필요한 경우 여기에 Node.js API나 Electron API를 안전하게 렌더러 프로세스에 노출하는 코드를 작성합니다.
contextBridge.exposeInMainWorld("electronAPI", {
  // 바탕화면 바로가기 생성 API
  createDesktopShortcut: () => ipcRenderer.invoke("create-desktop-shortcut"),

  // 버전 정보 등을 얻는 함수
  getVersions: () => {
    return {
      chrome: process.versions.chrome,
      node: process.versions.node,
      electron: process.versions.electron,
    };
  },
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
