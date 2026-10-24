function configurarRotas(app, chamados, contadorChamados){      
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
        if(typeof req.body.status !=="string"){
            return res.status(400).json({
                mensagem: "O status deve ser um texto"
            })
        }

        if(
            req.body.status !== "Aberto" && req. body.status !== "Em andamento" && req.body.status !== "Concluído"){
            return res.status(400).json({
                mensagem: "Status inválido"
            })
        }
       
        chamadoEncontrado.status = req.body.status
        res.json(chamadoEncontrado)
    }else{
        res.status(404).json({
            mensagem: "Chamado não encontrado"
        })
    }
})


app.delete("/chamados/:idChamado", (req, res) =>{
    const chamadoEncontrado = chamados.find((chamado) => {
        return Number(req.params.idChamado) === chamado.id
    })

    if(chamadoEncontrado){
        const indice = chamados.findIndex((chamado)=>{
            return chamado.id === chamadoEncontrado.id
        })

        chamados.splice(indice,1)

        res.json({
            mensagem: "Chamado excluído com sucesso!"
        })
    }else
        {
        res.status(404).json({
            mensagem: "Chamado não encontrado"
        })
    }
})


app.post("/chamados", (req, res) => {
    if(typeof req.body.titulo !== "string"){
        return res.status(400).json({
            mensagem: "O título deve ser um texto"
        })
    }    
    
    if(!req.body.titulo || !req.body.titulo.trim()){
        return res.status(400).json({
            mensagem: "O título é obrigatório"
        })
    }

    if(typeof req.body.descricao !== "string"){
        return res.status(400).json({
            mensagem: "A descrição deve ser um texto"
        })
    }

    if(!req.body.descricao || !req.body.descricao.trim()){
        return res.status(400).json({
            mensagem: "Descrição obrigatória"
        })
    }

    if(typeof req.body.status !=="string"){
        return res.status(400).json({
            mensagem: "O status deve ser um texto"
        })
    }

    if(req.body.status !== "Aberto" && req.body.status !== "Em andamento" && req.body.status !== "Concluído"){
        return res.status(400).json({
            mensagem: "Status inválido"
        })
    }

    //verifica se já existe um chamado com o mesmo título e descrição.
    const chamadoDuplicado = chamados.find ((chamado) => {
        return chamado.titulo === req.body.titulo && chamado.descricao === req.body.descricao
    })   

    if(chamadoDuplicado){
        return res.status(400).json({
            mensagem: "Chamado  duplicado!"
        })
    }

    const novoID = contadorChamados.proximoId++
    const chamado = {
        id:novoID,
        ...req.body
    }
    chamados.push(chamado)

    res.json({mensagem:"Chamado recebido com sucesso!",
        chamado: chamado
    })
})

}

module.exports = configurarRotas