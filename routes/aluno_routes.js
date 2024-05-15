// IMPORTA FRAMEWORK EXPRESS
import express from "express";

//IMPORTA O MÉTODO ALUNO
import {aluno} from "../controller/aluno_controller.js";

let router = express.Router();

/*
CHAMA O MÉTODO, ESPECIFICANDO QUE ELE É DO TIPO "GET", ENTÃO SÓ VAI EXIBIR DADOS,
SEM ENVIAR NADA
*/
router.get("/aluno", aluno.all);
router.post('/aluno', aluno.create);
router.put('/aluno/:matricula', aluno.update);
router.delete('/aluno/:matricula', aluno.delete);


export {router};