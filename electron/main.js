const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { execFile, spawn } = require("child_process");

const isDev = process.env.NODE_ENV === "development";
let nextProcess = null;
let mainWindow = null;

// 바탕화면 바로가기 생성 함수
function createDesktopShortcut() {
  if (process.platform === "win32") {
    const desktopPath = path.join(process.env.USERPROFILE, "Desktop");
    const shortcutPath = path.join(desktopPath, "MetaBookia.lnk");
    const appPath = process.execPath;

    // Windows 전용 바로가기 생성
    const { shell } = require("electron");
    shell.writeShortcutLink(shortcutPath, {
      target: appPath,
      description: "MetaBookia 애플리케이션",
      icon: path.join(__dirname, "..", "build", "icon.ico"), // 아이콘 경로
      iconIndex: 0,
    });

    return { success: true, path: shortcutPath };
  } else {
    return { success: false, error: "현재 Windows 플랫폼만 지원합니다." };
  }
}

// Next.js 서버 시작 함수
function startNextServer() {
  return new Promise((resolve, reject) => {
    if (isDev) {
      // 개발 모드에서는 3000번 포트에서 Next.js 개발 서버가 이미 실행 중이라고 가정
      resolve("http://localhost:3000");
    } else {
      // 프로덕션 모드에서는 Next.js 서버를 직접 시작
      console.log("Starting Next.js server in production mode...");

      // Next.js 서버 실행 (pnpm start)
      nextProcess = spawn("pnpm", ["start"], {
        cwd: path.join(__dirname, ".."),
        env: { ...process.env, NODE_ENV: "production" },
        shell: true,
      });

      let started = false;

      nextProcess.stdout.on("data", (data) => {
        console.log(`Next.js: ${data}`);

        // 서버가 준비되었는지 확인
        if (data.toString().includes("ready") && !started) {
          started = true;
          resolve("http://localhost:3000");
        }
      });

      nextProcess.stderr.on("data", (data) => {
        console.error(`Next.js error: ${data}`);
      });

      nextProcess.on("error", (err) => {
        console.error("Failed to start Next.js server:", err);
        reject(err);
      });

      // 15초 후에도 서버가 시작되지 않으면 타임아웃
      setTimeout(() => {
        if (!started) {
          reject(new Error("Next.js server did not start within 15 seconds"));
        }
      }, 15000);
    }
  });
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.75),
    height: Math.floor(height * 0.75),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // 개발/프로덕션 모드에 따라 URL 로드
  if (isDev) {
    // 개발 모드: 개발 서버에서 로드
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 모드: 빌드된 .next 디렉토리에서 로드
    const startUrl = url.format({
      pathname: path.join(__dirname, "..", ".next", "index.html"),
      protocol: "file:",
      slashes: true,
    });
    mainWindow.loadURL(startUrl);
  }
}

// IPC 핸들러 등록
ipcMain.handle("create-desktop-shortcut", async (event) => {
  return createDesktopShortcut();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // macOS에서는 Dock 아이콘을 클릭해도 앱 창이 다시 열리도록 합니다.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  // macOS를 제외한 모든 운영체제에서는 모든 창이 닫히면 앱을 종료합니다.
  if (process.platform !== "darwin") app.quit();
});

// 앱 종료 시 Next.js 서버도 함께 종료
app.on("quit", () => {
  if (nextProcess) {
    nextProcess.kill();
  }
});
