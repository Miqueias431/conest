const { ipcRenderer } = require('electron')

// Status de conexão (verifica se os bancos de dados está conectado)
ipcRenderer.send('send-message', "Status do banco de dados:")
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})