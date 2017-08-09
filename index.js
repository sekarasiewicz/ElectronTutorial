const { app, BrowserWindow } = require('electron')
const path = require('path')
let mainWindow
const { setMainMenu } = require('./main-menu.js')

app.on('ready', () => {
  // Prevent from show before everything is loaded
  mainWindow = new BrowserWindow({
    show: false
  })
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
  // Display when all elements are loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  setMainMenu()
})
