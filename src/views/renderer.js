// Vinculado ao preload.js
console.log(`Electron: ${api.verElectron()}`)
api.hello()

function sobre() {
    api.openAbout()
}

function clientes() {
    api.openclientesWindow()
}

function fornecedores() {
    api.openfornecedoresWindow()
}

function produtos() {
    api.openprodutosWindow()
}

