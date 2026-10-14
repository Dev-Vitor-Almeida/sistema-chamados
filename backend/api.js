const express = require("express")
const app = express()
app.use(express.json())
const chamados = [];

app.get("/", (req, res) => {
    res.send("Meu servidor está funcionando!")
})


app.post("/chamados", (req, res) => {
    chamados.push(req.body)
    
    res.json({mensagem:"Chamado recebido com sucesso!",
        chamado: req.body
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})