const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createWindow() {
  const window = new BrowserWindow({
    width: 600,
    height: 400,
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, "./src/preload.js"),
    },
  });

  window.loadFile("./src/pages/index.html");
}
