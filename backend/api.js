const configurarRotas = require("./routes/chamados")
const express = require("express")

const app = express()
app.use(express.json())
 
configurarRotas(app)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})