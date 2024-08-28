/**
 * Tela de produto
 */

// mudar propriedades da tela ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById("inputProduct").focus()
    document.getElementById("idProduct").disabled = true
})

let formProduto, idProduto, barcodeInput, nomeProdutoInput,imagemProdutoInput
formProduto = document.querySelector("#frmProdutos")
barcodeInput = document.querySelector("#barcodeProduct")
nomeProdutoInput = document.querySelector("#nameProduct")
imagemProdutoInput = document.querySelector("#uploadProduct")
//renderizar imagem
imagemProdutoPreview = document.querySelector("#imagemProduto")

// Estrutura de dados - Produto
let arrayProduto = []

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
formProduto.addEventListener("submit", async (event) => {
    event.preventDefault()
    console.log(barcodeInput.value, nomeProdutoInput.value, imagemProdutoInput.value)

    const produto = {
        barcode: barcodeInput.value,
        nomeProduto: nomeProdutoInput.value,
        imagemProduto: imagemProdutoInput.files[0].path
    }
    api.newProduct(produto)
    formProduto.reset()
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// BarCode
const inputField = document.getElementById("inputProduct")

document.getElementById("inputProduct").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault() // Evita o envio do formulário padrão              
        barcode = inputField.value
        //console.log(barcode)
        document.getElementById("inputProduct").disabled = true
        api.barcodeSearch(barcode)
    }
})

api.setBarcode((event, setCodeBar) => {
    let setarBarcode = document.getElementById("inputProduct").value
    document.getElementById("barcodeProduct").value = setarBarcode
    document.getElementById("inputProduct").value = ""
    document.getElementById("inputProduct").blur()
})

api.clearSearch((args) => {
    document.getElementById("inputProduct").value = ""
    clean()
})

api.dataProdutos((event, dadosProduto) => {
    //console.log(dadosProduto)
    const produto = JSON.parse(dadosProduto)
    arrayProduto = produto
    console.log(arrayProduto)
    arrayProduto.forEach((t) => {
        document.getElementById("idProduct").value = t._id
        document.getElementById("barcodeProduct").value = t.barcode
        document.getElementById("nameProduct").value = t.nomeProduto
        imagemProdutoPreview.src = t.imagemProduto     
        //limpar caixa de busca
        document.getElementById("inputProduct").value = ""
        //remover o foco da caixa de busca
        document.getElementById("inputProduct").blur()
        //desativar o botão adicionar
        document.getElementById("btnCreate").disabled = true
        // ativar os botões update e delete
        document.getElementById("btnUpdate").disabled = false
        document.getElementById("btnDelete").disabled = false
    })
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Limpar os campos e resetar os botões >>>>>>>>>>>>>>
function clean() {
    document.getElementById("btnCreate").disabled = false
    document.getElementById("btnUpdate").disabled = true
    document.getElementById("btnDelete").disabled = true
    document.getElementById("inputProduct").disabled = false
    document.getElementById("inputProduct").focus()
    imagemProdutoPreview.src = "../public/img/camera.png"
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<