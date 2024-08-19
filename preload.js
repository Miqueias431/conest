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
    // Criação do cliente e fornecedor
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    // Caixa para força a busca dos clientes ou fornecedores
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'),
    // Foco na caixa de busca
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    // Busca do cliente e fornecedor
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send('search-fornecedor', nomeFornecedor),
    nameClient: (args) => ipcRenderer.on('name-cliente', args),
    nameFornecedor: (args) => ipcRenderer.on('name-fornecedor', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client',dadosCliente),
    dataFornecedor: (dadosFornecedor) => ipcRenderer.on('data-fornecedor',dadosFornecedor),
    // Limpar a caixa de busca
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    // Resetar o formulaário 
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    // Atualizar o cliente e fornecedor
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-fornecedor', fornecedor),
    // Deletar o cliente e fornecedor
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    deleteFornecedor: (idForn) => ipcRenderer.send('delete-fornecedor', idForn),
    // Limpar todos os clientes e fornecedores
    clearClient:(clearCliente) => ipcRenderer.on('clear-all-client', clearCliente),
    focusClient:(focusCliente) => ipcRenderer.on('focus-client', focusCliente)
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