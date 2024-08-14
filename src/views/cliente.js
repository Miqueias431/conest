/**
 * Processo de renderização 
 * clientes
 */

// Mudar propriedade do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus() // Aplica o foco no campo de busca
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

/*
// Função para manipular o evento enter - (UX)
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        // Execultar a função acossiada ao botão buscar
        buscarCliente()
    }
}

// Adicionar a função de manipulação do envento da tecla Enter
document.getElementById('frmCliente').addEventListener('keydown', teclaEnter)

// Função para remover o manipulador de eventos da tecla Enter
function removerTeclaEnter() {
    document.getElementById('frmCliente').removeEventListener('keydown', teclaEnter)
}
*/
// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Captura dos Inputs do Formulário (Passo 1 - slides)
let formCliente = document.getElementById('frmCliente')
let idCliente = document.getElementById('inputId')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')


// Evento relacionado ao botão adicionar (Passo 1 - slides)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    //limpar os dados from após envio
    formCliente.reset()
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array(vetor) usado na renderização dos dados do cliente
let arrayCliente = []
// Função que vai enviar ao main um pedido de busca dos dados de um cliente pelo nome (Passo 1 - Slide)
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
    // Validação (UX)
    if (nomeCliente === "") {
        // Validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // Enviar o pedido de busca junto com nome do cliente
        api.searchClient(nomeCliente)
    }
    // Foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })

    // Setar o nome do cliente e abilitar o cadastramento
    api.nameClient((args) => {
        // Restaurar o comportamento padrão da tecla Enter
        //removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value
        document.getElementById('inputNameClient').value += setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputNameClient').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // Receber do main.js os dados do cliente (Passo 4 - Slide)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)

        // Passo 5 (final) Percorrer o array, extrair os dados e setar os campos de texto (caixas input) do formulário
        arrayCliente.forEach((c) => {
            document.getElementById('inputId').value = c._id,
                document.getElementById('inputNameClient').value = c.nomeCliente,
                document.getElementById('inputPhoneClient').value = c.foneCliente,
                document.getElementById('inputEmailClient').value = c.emailCliente
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
function editarCliente() {
    // Passo 1 
    const cliente = {
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente) // Teste do passo 1
    // Passo 2: Enviar o objeto cliente a o main.js
    api.updateClient(cliente)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente() {
    let idCli = idCliente.value // Passo 1 (obter o id do cliente)
    console.log(idCli) // teste passo 1

    api.deleteClient(idCli) // Passo 2 - enviar o id do cliente a main.js
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<