const read = require ('readline-sync')

function teste() {
    alert('teste')
}

function buscarcep() {
    let valor
    valor = String(frmFornecedor.txtCEP.value)
    let urlAPI = `https://viacep.com.br/ws/${valor}/json/`

    fetch(urlAPI)
        .then((Response) => {
            return Response.json()
        })

        .then((dados) => {
            frmFornecedor.inputLogradouro.value = `${dados.logradouro}`
            frmFornecedor.inputBairro.value = `${dados.bairro}`
            frmFornecedor.inputLocalidade.value = `${dados.localidade}`
            frmFornecedor.inputUF.value = `${dados.uf}`
            /*
            console.log(dados.logradouro)
            console.log(dados.bairro)
            console.log(dados.localidade)
            console.log(dados.uf)
            */
        })

        .catch((error) => {
        console.log(`Erro ao obter o endereço: ${error}`)
        })
}