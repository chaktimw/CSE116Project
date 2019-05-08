
var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;



function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1400, height: 1000});

    // and load the index.html of the app.
    win.loadURL("http://localhost:8080/");

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
app.on('ready', createWindow);