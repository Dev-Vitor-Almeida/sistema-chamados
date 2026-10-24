const configurarRotas = require("./routes/chamados")
const express = require("express")
const app = express()
app.use(express.json())

const chamados = [];
const contadorChamados = {proximoId: 1} 
configurarRotas(app, chamados, contadorChamados)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})