/**
 * Processo de renderização 
 * Fornecedor
 */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus() // Aplica o foco no campo de busca
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})


// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputIdForn')
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
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let arrayFornecedor = []

function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')

    if (nomeFornecedor === "") {
        api.infoSearchDialog()
    } else {
        api.searchFornecedor(nomeFornecedor)
    }

    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })

    api.nameFornecedor((args) => {
        let setarNomeFornecedor = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
        document.getElementById('inputNomeFor').value += setarNomeFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputNomeFor').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })

    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })

    api.dataFornecedor((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)

        arrayFornecedor.forEach((f) => {
            document.getElementById('inputIdForn').value = f._id,
            document.getElementById('inputNomeFor').value = f.nomeFornecedor,
            document.getElementById('inputPhoneFor').value = f.foneFornecedor,
            document.getElementById('inputEmailFor').value = f.emailFornecedor,
            document.getElementById('inputCnpj').value = f.cnpjFornecedor,
            document.getElementById('inputCEP').value = f.cepFornecedor,
            document.getElementById('inputLogradouro').value = f.logFornecedor,
            document.getElementById('inputNumero').value = f.numFornecedor,
            document.getElementById('inputComplemento').value = f.compFornecedor,
            document.getElementById('inputBairro').value = f.bairroFornecedor,
            document.getElementById('inputLocalidade').value = f.cidFornecedor,
            document.getElementById('inputUF').value = f.ufFornecedor

            // limpar a caixa de busca (UX)
            document.getElementById('inputSearch').value = ""
            //remover o foco e desativar a caixa de busca
            document.getElementById('inputSearch').disabled = true
            document.getElementById("inputSearch").blur()
            //desativar os botão adicionar e buscar
            document.getElementById("btnCreate").disabled = true
            document.getElementById("btnRead").disabled = true
            // ativar os botões update e delete
            document.getElementById("btnUpdate").disabled = false
            document.getElementById("btnDelete").disabled = false
        })
    })


}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {

    const fornecedor = {
        idForn: idFornecedor.value,
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
    console.log(fornecedor)

    api.updateFornecedor(fornecedor)

    document.getElementById("btnRead").disabled = false
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputSearch').focus()
    document.getElementById("btnDelete").disabled = true
    document.getElementById("btnUpdate").disabled = true

}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function excluirFornecedor() {
    let idForn = idFornecedor.value
    console.log(idForn)

    api.deleteFornecedor(idForn)

    document.getElementById("btnRead").disabled = false
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputSearch').focus()
    document.getElementById("btnDelete").disabled = true
    document.getElementById("btnUpdate").disabled = true
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.clearClient((clearClient) => {
    console.log("Campo limpo")
    formFornecedor.reset()
})

api.focusClient((focusClient) => {
    //remover o foco e desativar a caixa de busca
    document.getElementById('inputSearch').disabled = true
    document.getElementById("inputSearch").blur()
    //desativar os botão adicionar e buscar
    document.getElementById("btnCreate").disabled = true
    document.getElementById("btnRead").disabled = true
    // ativar os botões update e delete
    document.getElementById("btnUpdate").disabled = false
    document.getElementById("btnDelete").disabled = false
})


api.resetForm((args) => {
    resetForm()
})

function resetForm() {
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnRead.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // document.getElementById("frmCliente").addEventListener("keydown", teclaEnter)  
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<