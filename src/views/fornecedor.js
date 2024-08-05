/**
 * Processo de renderização 
 * Fornecedor
 */

let formFornecedor = document.getElementById('frmFornecedor')
let nomeFornecedor = document.getElementById('inputNomeFor')
let foneFornecedor = document.getElementById('inputPhoneFor')
let emailFornecedor = document.getElementById('inputEmailFor')
let cnpjFornecedor = document.getElementById('inputCnpj')
let cepFornecedor = document.getElementById('inputCEP')
let logFornecedor = document.getElementById('inputLogradouro')
let numFornecedor = document.getElementById('inputNumero')
let compFornecedor = document.getElementById('inputComplemento')
let bairroFornecedor = document.getElementById('inputBairro')
let cidFornecedor = document.getElementById('inputLocalidade')
let ufFornecedor = document.getElementById('inputUF')

formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    const fornecedor = {
        nomeFor: nomeFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        cepFor: cepFornecedor.value,
        logFor: logFornecedor.value,
        numFor: numFornecedor.value,
        compFor: compFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidFor: cidFornecedor.value,
        ufFor: ufFornecedor.value
    }
    api.newFornecedor(fornecedor)
    formFornecedor.reset()
})