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