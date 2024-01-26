const { getPrinters } = require("pdf-to-printer/dist/bundle.js");
const { app, BrowserWindow } = require("electron/main");
const fs = require("fs");
const path = require("node:path");

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  getPrinters().then(printersAvailable);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, "./src/preload.js"),
    },
  });

  win.loadFile("./assets/index.html");

  ipcMain.on("make-window-opaque", () => appWin.setOpacity(1));
}

function printersAvailable(printersArray) {
  let jsonData = printersArray;

  fs.writeFile("printers.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Arquivo gravado com sucesso!");
  });
}
