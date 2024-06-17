const { ipcMain, Menu, nativeTheme } = require('electron')
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
        icon: './src/public/img/estoque192.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre
let about //Resolver BUG de abertura de várias janelas

nativeTheme.themeSource = 'light'
const aboutWindow = () => {

    // se a janela about não estiver aberta (BUG 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 420,  // Largura
            height: 300,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
        })
    }

    about.loadFile('./src/views/sobre.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
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

// template do menu personalizado
const template = [

    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]

    }
]

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

ipcMain.on('open-about', () => {
    aboutWindow()
})
