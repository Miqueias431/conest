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

// Alterar comportamento do Enter dentro do formulário (Relacionar ao botão de busca) - (UX)
document.getElementById('frmCliente').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        // Execultar a função acossiada ao botão buscar
        buscarCliente()
    }
})

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Captura dos Inputs do Formulário (Passo 1 - slides)
let formCliente = document.getElementById('frmCliente')
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
    if (nomeCliente.value === "") {
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
        let setarNomeCliente = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
        document.getElementById('inputNameClient').value = setarNomeCliente
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

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset do Formulario
function resetForm(){
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById('inputSearch').disabled = false
    btnRead.disabled = false
}
