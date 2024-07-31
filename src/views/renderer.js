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

function relatorio() {
    api.openRelatorio()
}

api.dbMessage((event, message) =>{
    console.log(message)
    if (message === "conectado") {
        document.getElementById("dbstatus").src = "../public/img/dbon.png"
    } else {
        document.getElementById("dbstatus").src = "../public/img/dboff.png"
    }

})
