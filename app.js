const { app, BrowserWindow } = require("electron");

let window;

app.on("ready", () => {
  window = new BrowserWindow({});

  window.loadURL(`file://${__dirname}/assets/index.html`);
});
