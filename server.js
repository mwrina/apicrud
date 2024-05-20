import express from "express";
import {router} from "./routes/produto_routes.js"
import cors from "cors"

let server = express();

server.use(cors())

server.use(express.json())

server.use(express.urlencoded({extended:true}));

server.use("/", router)

server.listen(3000, function(){
	console.log("Porta 3000");
});