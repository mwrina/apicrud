//O SERVIDOR SERVE PARA TRATAR AS REQUISIÇÕES FEITAS PELO CLIENTE

import express from "express";
import {router} from "./routes/aluno_routes.js"
//IMPORTAÇÃO DAS ROTAS

let server = express();

server.use(express.json())
//AJUDA A TROCAR DADOS ENTRE CLIENTE E SERVIDOR VIA JSON

server.use(express.urlencoded({extended:true}));
//SERVE PARA VIABILIZAR O USO DO TOKEN

server.use("/", router)
//CHAMA O MÉTODO DA ROTA ESPECÍFICA?

server.listen(3000, function(){
	console.log("Porta 3000");
});

