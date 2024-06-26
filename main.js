const { ipcMain, Menu, nativeTheme } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// Importar o módulo de conexão
const { conectar, desconectar } = require('./database.js')


// Janela Principal (definir o objeto win como variavel publica)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
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

    const father = BrowserWindow.getFocusedWindow()
    // se a janela about não estiver aberta (BUG 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 420,  // Largura
            height: 300,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
            parent: father,
            modal: true
        })
    }

    about.loadFile('./src/views/sobre.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

// Janela Clientes
let clientes 

const clientesWindow = () => {

    const father = BrowserWindow.getFocusedWindow()
    // se a janela clientes não estiver aberta (BUG 1) abrir
    if (!clientes) {
        clientes = new BrowserWindow({
            width: 1280,  // Largura
            height: 720,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
            parent: father,
            modal: true
        })
    }

    clientes.loadFile('./src/views/clientes.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    clientes.on('closed', () => {
        clientes = null
    })
}

// Janela Fornecedores
let fornecedores

const fornecedoresWindow = () => {

    const father = BrowserWindow.getFocusedWindow()

    // se a janela fornecedores não estiver aberta (BUG 1) abrir
    if (!fornecedores) {
        fornecedores = new BrowserWindow({
            width: 1280,  // Largura
            height: 720,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
            parent: father,
            modal: true
        })
    }

    fornecedores.loadFile('./src/views/fornecedores.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    fornecedores.on('closed', () => {
        fornecedores = null
    })
}

// Janela Produtos
let produtos

const produtosWindow = () => {

    const father = BrowserWindow.getFocusedWindow()

    // se a janela produtos não estiver aberta (BUG 1) abrir
    if (!produtos) {
        produtos = new BrowserWindow({
            width: 1280,  // Largura
            height: 720,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
            parent: father,
            modal: true 
        })
    }

    produtos.loadFile('./src/views/produtos.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    produtos.on('closed', () => {
        produtos = null
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

ipcMain.on('open-about', () => {
    aboutWindow()
})

ipcMain.on('open-produtos-window', () => {
    produtosWindow()
})

ipcMain.on('open-clientes-window', () => {
    clientesWindow()
})

ipcMain.on('open-fornecedores-window', () => {
    fornecedoresWindow()
})




// template do menu personalizado
const template = [

    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientesWindow()
            },
            {
                label: 'Fornecedores',
                click: () => fornecedoresWindow()
            },
            {
                label: 'Produtos',
                click: () => produtosWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
          {
            label: 'Recarregar',
            role: 'reload'
          },
          {
            label: 'Ferramentas do desenvolvedor',
            role: 'toggleDevTools'
          },
          {
            type: 'separator'
          },
          {
            label: 'Aplicar zoom',
            role: 'zoomIn'
          },
          {
            label: 'Reduzir',
            role: 'zoomOut'
          },
          {
            label: 'Restalra o zoom padrão',
            role: 'resetZoom'
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

