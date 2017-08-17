const { ipcRenderer } = require('electron')
const coultEl = document.querySelector('#count')
ipcRenderer.on('window-count', (event, props) => {
    coultEl.textContent = props.count
})

ipcRenderer.send('get-window-count')

document.querySelector('#new-window').addEventListener('click', () => {
    ipcRenderer.send('create-window', {
        x: 0,
        y: 0,
    })
})