/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose (npm i mongoose)
 */

// Importar a biblioteca
const mongoose = require('mongoose')

// Definir o banco de dados (copiar a string do compass)
// Atlas
let url = "mongodb+srv://admin:Senac123@clusterconest.059s1l6.mongodb.net/dbconest"

// Conectar
const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("Conectado ao MongoDB")
    } catch (error) {
        console.log(`Problema ao tentar conectar: ${error.message}`)
    }
}

// Desconectar
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("Desconectado do MongoDB")
    } catch (error) {
        console.log(`Problema a tentar desconectar: ${error.message}`)
    }
}

// Exportar para o main os métodos conectar e desconectar
module.exports = { conectar, desconectar }