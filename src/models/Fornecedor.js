/**
 * Modelo de dados (model) Fornecedores
 */

const {model, Schema} = require ('mongoose')

const fornecedorSchema = new Schema(
    {
        nomeFornecedor: {
            type: String
        },
        foneFornecedor: {
            type: String
        },
        emailFornecedor: {
            type: String
        },
        cnpjFornecedor: {
            type: String
        },
        cepFornecedor: {
            type: String
        },
        logFornecedor: {
            type: String
        },
        numFornecedor: {
            type: String
        },
        compFornecedor: {
            type: String
        },
        bairroFornecedor: {
            type: String
        },
        cidFornecedor: {
            type: String
        },
        ufFornecedor: {
            type: String
        }

    }
)

module.exports = model('Fornecedor', fornecedorSchema)