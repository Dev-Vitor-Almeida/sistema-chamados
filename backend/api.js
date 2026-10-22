const express = require("express")
const app = express()
app.use(express.json())
const chamados = [];

app.get("/", (req, res) => {
    res.send("Meu servidor está funcionando!")
})


app.post("/chamados", (req, res) => {
    const novoID = chamados.length + 1
    const chamado = {
        id:novoID,
        ...req.body
        
    }
    chamados.push(chamado)

    res.json({mensagem:"Chamado recebido com sucesso!",
        chamado: chamado
    })
})

app.get("/chamados", (req, res) => {
    res.json(chamados)
})

app.get("/chamados/:idChamado", (req, res) => {
    const chamadoEncontrado = chamados.find((chamado) =>{
        return Number(req.params.idChamado) === chamado.id
    })
    if(chamadoEncontrado){
        res.json(chamadoEncontrado)
    }else{
        res.status(404).json({
            mensagem:"Chamado não encontrado"
        })
        console.log("Não encontrado, erro 404")
    }    
})

app.patch("/chamados/:idChamado", (req,res) =>{
    const chamadoEncontrado = chamados.find((chamado)=>{
        return Number(req.params.idChamado) === chamado.id
    })
    
    if(chamadoEncontrado){
        chamadoEncontrado.status = req.body.status
        res.json(chamadoEncontrado)
    }else{
        res.status(404).json({
            mensagem: "Chamado não encontrado"
        })
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})