const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain } = electron
const path = require('path')
const url = require('url')

let mainWindow, secondWindow

function createWindow(fileStr, options) {
    let win = new BrowserWindow(options)
        //webcontents events

    win.webContents.on('did-start-loading', event => {
        console.log('did-start-loading', event.sender.webContents.browserWindowOptions.title)
    })

    win.webContents.on('dom-ready', event => {
        console.log('dom-ready')
    })

    win.webContents.on('did-finish-load', event => {
        console.log('did-finish-load', event.sender.webContents.getTitle())
    })

    win.webContents.on('did-stop-loading', event => {
        console.log('did-stop-loading', event.sender.webContents.id)
    })

    win.webContents.on('did-fail-load', event => {
        console.log('did-fail-load', event.sender.webContents.getTitle())
    })

    win.webContents.on('did-frame-finish-load', event => {
        console.log('did-frame-finish-load', event.sender.webContents.getTitle())
    })

    win.webContents.on('did-get-response-details', event => {
        console.log('did-get-response-details', event.sender.webContents.browserWindowOptions.id)
    })

    //loadinf files
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

    //webcontent Events

    win.webContents.on('did-start-loading', event => {
        console.log('did-start-loading:', event.sender.webContents.browserWindowOptions.title)
    })

    win.webContents.on('dom-ready', event => {
        console.log('dom-ready')
    })
}

app.on('ready', event => {
    mainWindow = createWindow('index.html', {
        show: false,
        width: 1300,
        height: 800,
        title: 'mainWiandow',
        backgroundColor: '#ece'
    })

    secondWindow = createWindow('about.html', {
        width: 800,
        height: 500,
        title: 'secondWindow',
        backgroundColor: '#dcd'
    })
})