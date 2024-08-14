const { contextBridge, ipcRenderer } = require('electron')

// Status de conexão (verifica se os bancos de dados está conectado)
ipcRenderer.send('send-message', "Status do banco de dados:")
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

// Gerenciamento de processos (desempenho e segurança)
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    hello: () => ipcRenderer.send('send-message', "Oi!"),
    openAbout: () => ipcRenderer.send('open-about'),
    openprodutosWindow: () => ipcRenderer.send('open-produtos-window'),
    openclientesWindow: () => ipcRenderer.send('open-clientes-window'),
    openfornecedoresWindow: () => ipcRenderer.send('open-fornecedores-window'),
    openRelatorio: () => ipcRenderer.send('opne-relatorio'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('name-cliente', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client',dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli)
})

// Inserir data na pagina
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return data.toLocaleDateString('pt-br', options)
}


// Interagir diretamente no DOM do documento html (index.html)
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})