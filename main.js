const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// Importar o módulo de conexão
const { conectar, desconectar } = require('./database.js')


// Janela Principal (definir o objeto win como variavel publica)
let win
const createWindow = () => {
     win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./src/views/index.html')
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    //   status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message} >>>`)
        statusConexao()
    })

    // Desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//-------------------------------------------------------------
// Função para verificar status de conexão com o banco de dados
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado.")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}
