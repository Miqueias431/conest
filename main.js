const { ipcMain, nativeTheme, dialog } = require('electron')
const { app, BrowserWindow, Menu, shell } = require('electron/main')
const path = require('node:path')

// Importar o módulo de conexão
const { dbStatus, desconectar } = require('./database.js')
// status de conexão do banco de dados (No MongoDB é mais eficiente manter uma única conexão aberta durante todo o tempo de vida do aplicativo e usá-la conforme necessário. Fechar e reabrir a conexão frequentemente pode aumentar a sobrecarga e causar problemas de desempenho)
// a função dbStatus garante que a conexão com o banco de dados seja estabelecida apenas uma vez e reutilizada.
// a variável abaixo é usada para garantir que o sistema inicie com o banco de dados desconectado
let dbCon = null

// Importação do Schema (model) das coleções("tabelas")
const clienteModel = require('./src/models/Cliente.js')
const fornecedorModel = require('./src/models/Fornecedor.js')
const { crash } = require('node:process')


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

    // status de conexão com o banco de dados
    ipcMain.on('send-message', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', "conectado")
    })

    // Desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })

    createWindow()

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
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Cliente cadastrado com sucesso!',
            buttons: ['Ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})

ipcMain.on('new-fornecedor', async (event, fornecedor) => {
    console.log(fornecedor)
    // Passo 3 (slide): Cadastrar o fornecedor no MongoDB
    try {
        // Extrair os dados do objeto
        const novoFornecedor = new fornecedorModel({
            nomeFornecedor: fornecedor.nomeFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            cepFornecedor: fornecedor.cepFor,
            logFornecedor: fornecedor.logFor,
            numFornecedor: fornecedor.numFor,
            compFornecedor: fornecedor.compFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidFornecedor: fornecedor.cidFor,
            ufFornecedor: fornecedor.ufFor

        })

        await novoFornecedor.save() // save() - moongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Fornecedor cadastrado com sucesso!',
            buttons: ['Ok']
        })
    } catch (error) {
        console.log(error)
    }
})


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso!!! (Busca: Prenchimento de campo obrigatório)
ipcMain.on('dialog-infoSearchDialog', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atenção!',
        message: 'Preencha um nome no campo de busca',
        buttons: ['Ok']
    })

    event.reply('focus-search')
})

// Recebimento do pedido de busca do cliente pelo nome (Passo 1 - Slide)
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente)
    // Passo 2 : Busca no banco de dados
    try {
        // find() "metodo de busca", newRegex 'i' case insensitive
        const dadosCliente = await clienteModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') }) // Passo 2
        console.log(dadosCliente) // Passo 3 (recebimento dos dados do cliente)
        // UX -> Se o cliente não estiver cadastrardo, avisar ao usuário e habilitar o botão cadastrar
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Aviso!',
                message: 'Cliente não encontrado.\nDeseja cadastrar este cliente?',
                buttons: ['Sim', 'Não'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    // Setar o nome do cliente no form e habilita o botão cadastrar
                    event.reply('name-cliente')
                } else {
                    // Limpar a caixa de busca
                    event.reply('clear-search')
                }
            })
        } else {
            // Passo 4 (Enviar os dados do cliente ao renderizador)
            event.reply('data-client', JSON.stringify(dadosCliente))
        }
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-client', async (event, cliente) => {
    console.log(cliente) // Teste do passo 2 - slide
    // Passo 3 (slide): Cadastrar o cliente no MongoDB

    try {
        // Extrair os dados do objeto
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            cliente.idCli, {
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Dados do cliente alterados com sucesso.',
            buttons: ['Ok'],
            defaultId: 0
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-client', (event, idCli) => {
    console.log(idCli) // Teste do passo 2 - slide
    // Importante! Confirma a ação antes de excluir do banco
    dialog.showMessageBox({
        type: 'error',
        title: 'ATENÇÃO!',
        message: 'Tem certeza que deseja apagar este cliente?',
        defaultId: 0,
        buttons: ['Sim', 'Não']
    }).then(async (result) => {
        if (result.response === 0) {
            // Passo 3 (excluir cliente do banco)
            try {
                await clienteModel.findByIdAndDelete(idCli)
                event.reply('clear-all-client')
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Aviso',
                    message: 'Cliente excluído com sucesso!',
                    buttons: ['Ok']
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            event.reply('focus-client')
        }
    })
})


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
