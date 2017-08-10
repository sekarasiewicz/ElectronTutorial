const { app, Menu } = require('electron')
const isWindows = process.platform === 'win32'
const { showMessage, showSaveDialog, showOpenDialog } = require('./dialogs.js')

module.exports = {
  setMainMenu,
}

function setMainMenu(mainWindow) {
  const template =[
    {
      label: app.getName(),
      submenu: [
        {
          label: 'Say Hello',
          click() {
            showMessage(mainWindow)
          }
        },
        {
          label: 'Save memory usage info',
          click() {
            showSaveDialog(mainWindow)
          }
        },
        {
          label: 'Open file',
          click() {
            showOpenDialog(mainWindow)
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
          accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
