/**
 * Processo de renderização 
 * clientes
 */

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
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<