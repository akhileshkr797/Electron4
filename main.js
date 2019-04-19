const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain } = electron
const path = require('path')
const url = require('url')

let mainWindow

function createWindow(fileStr, options) {
    let win = new BrowserWindow(options)

    win.loadURL(url.format({
        pathname: path.join(__dirname, fileStr),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('close', function() {
        win = null
    })

    return win
}

app.on('ready', event => {
    mainWindow = createWindow('index.html', {
        show: false,
        width: 1300,
        height: 800,
        title: 'mainWiandow',
        backgroundColor: '#ece'
    })
})