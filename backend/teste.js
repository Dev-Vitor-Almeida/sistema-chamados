const chamadoCriado = {
    titulo: "Computador não liga",
    descricao: "Aperto o botão, mas nada acontece",
    prioridade: "Alta"
}

async function chamado(){
    try{
        const resposta = await fetch("http://localhost:3000/chamados", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(chamadoCriado)
        });

        if(resposta.ok){
            const dados = await resposta.json()
            console.log(dados)
        }else{
            console.log("ERRO HTTP")
        }
    }catch{
        console.log("ERRO DE REQUISIÇÃO")
    }
}

chamado()