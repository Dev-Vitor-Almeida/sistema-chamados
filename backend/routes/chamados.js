const conexao = require("../banco")

function configurarRotas(app){      
app.get("/chamados", (req, res) => {
    conexao.query("SELECT * FROM chamados", (erro, resultados) => {
        if(erro){
            console.error("Erro ao buscar chamados:", erro.message);
            return res.status(500).json({
                erro: "Erro ao buscar chamados."
            });
        }

        res.json(resultados)
    })
})


app.get("/chamados/:idChamado", (req, res) => {
    conexao.query(
        "SELECT * FROM chamados WHERE id = ?",
        [req.params.idChamado],
        (erro, resultados) => {
            if(erro) {
                console.error("Erro ao buscar chamado:", erro.message);
                return res.status(500).json({
                    mensagem: "Erro ao buscar chamado."
                })
            }

            if(resultados.length === 0) {
                return res.status(404).json({
                    mensagem: "Chamado não encontrado"
                })
            }
            res.json(resultados[0]);
        } 
    )    
})


app.patch("/chamados/:idChamado", (req,res) =>{
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

    conexao.query("UPDATE chamados SET status = ? WHERE id = ?",
        [req.body.status, req.params.idChamado],
        (erro, resultado) => {
            if(erro){
                console.error("Erro ao atualizar chamado:", erro.message);

                return res.status(500).json({
                    mensagem: "Erro ao atualizar chamado."
                })
            }

            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensagem: "Nenhum chamado foi encontrado"
                })
            }

            res.json({
                mensagem: "Status do chamado atualizado com sucesso!"
            });
        }
    )
})


app.delete("/chamados/:idChamado", (req, res) =>{
    conexao.query("DELETE FROM chamados WHERE id = ?", 
        [req.params.idChamado],
        (erro, resultado) =>{
            if(erro){
                console.error("Erro ao excluir chamado:", erro.message);

                return res.status(500).json({
                    mensagem: "Erro ao excluir chamado."
                })
            }

            
            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensagem: "Nenhum chamado foi encontrado"
                })
            }

            res.json({
                mensagem: "Chamado excluído com sucesso!"
            });
        }
    )
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

    conexao.query("SELECT id FROM chamados WHERE titulo = ? and descricao = ? LIMIT 1",
    [req.body.titulo, req.body.descricao],
    (erro, resultados) => {
        if(erro){
            console.error("Erro na operação:", erro.message);

            return res.status(500).json({
                mensagem: "Erro ao verificar chamado"
            })
        }

        if(resultados.length > 0){
            return res.status(400).json({
                mensagem:"Já existe um chamado com esse título e descrição!"
            })
        }

        conexao.query("INSERT INTO chamados (titulo, descricao, status) VALUES (?, ?, ?)", 
        [req.body.titulo, req.body.descricao, req.body.status],
        (erro, resultado) => {
            if(erro){
                console.error("Erro ao criar chamado:", erro.message)

                return res.status(500).json({
                    mensagem: "Erro ao criar chamado."
                })
            }

            res.json({
                mensagem: "Chamado criado com sucesso!",
                chamado: {
                    id: resultado.insertId,
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                    status: req.body.status
                }
            });
        }
    );   
    });
 });
}

module.exports = configurarRotas