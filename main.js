const { ipcMain, Menu, nativeTheme } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

// Importar o módulo de conexão
const { conectar, desconectar } = require('./database.js')

// Importação do Schema (model) das coleções("tabelas")
const clienteModel = require ('./src/models/Cliente.js')


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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    produtos.loadFile('./src/views/produtos.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    produtos.on('closed', () => {
        produtos = null
    })
}

// Janela Relatório
let relatorio

const relatorioWindow = () => {

    const father = BrowserWindow.getFocusedWindow()

    // se a janela relatorio não estiver aberta (BUG 1) abrir
    if (!relatorio) {
        relatorio = new BrowserWindow({
            width: 1280,  // Largura
            height: 720,  // Altura
            icon: './src/public/img/estoque192.png',
            resizable: false, // Evitar o redimensionameto
            autoHideMenuBar: true, // Esconde a barra de menu
            parent: father,
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    relatorio.loadFile('./src/views/relatorio.html')
    // Resolver BUG 2 (reabrir a janela se estiver fechada)
    relatorio.on('closed', () => {
        relatorio = null
    })
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    //   status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        statusConexao()
        console.log(`<<< ${message} >>>`)
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

ipcMain.on('opne-relatorio', () => {
    relatorioWindow()
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
        label: 'Relatório',
        click: () => relatorioWindow()
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
        win.webContents.send('db-status', "conectado")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // Teste do passo 2 - slide
    // Passo 3 (slide): Cadastrar o cliente no MongoDB
    try {
        // Extrair os dados do objeto
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })

        await novoCliente.save() // save() - moongoose
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
