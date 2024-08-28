/**
 * Model Produto
 */

const {model, Schema} = require('mongoose')

const produtoSchema = new Schema({
    barcode: {
        type: String
    },
    nomeProduto: {
        type: String
    },
    imagemProduto: {
        type: String
    }
})

module.exports = model('Produto', produtoSchema)