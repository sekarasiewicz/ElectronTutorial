const { dialog, app, nativeImage } = require('electron')
const fs = require('fs')
const path = require('path')

module.exports = { showMessage, showSaveDialog, showOpenDialog }

function showMessage(browserWindow) {
    dialog.showMessageBox(browserWindow, {
        type: 'info',
        icon: nativeImage.createFromPath('./kitten.jpg'),
        message: 'Hello',
        detail: 'Just friendly meow',
        buttons: ['Meow', 'Close'],
        defaultId: 0,
    }, (clickedIndex) => {
        console.log(clickedIndex)
    })
}

function showSaveDialog(browserWindow) {
    dialog.showSaveDialog(browserWindow, {
        defaultPath: path.join(app.getAppPath('downloads'), 'memory-info.txt')
    }, (filename) => {
        if (filename) {
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2)
            fs.writeFile(filename, memInfo, 'utf-8', (err) => {
                if (err) {
                    dialog.showErrorBox('Save Faild.', err.message)
                }
            })
        }
    })
}

function showOpenDialog(browserWindow) {
    dialog.showOpenDialog(browserWindow, {
        defaultPath: app.getAppPath('downloads'),
        filters: [
            {'name': 'Text Files', extensions: ['txt']}
        ]
    }, (filePaths) => {
        if (filePaths) {
            console.log(filePaths, fs.readFileSync(filePaths[0], 'utf-8'))
        }
    })
}