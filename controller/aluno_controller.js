import connect from "../config/connection.js";

//OBJETO VAZIO A SER EXPORTADO PARA OUTROS ARQUIVOS DA APLICAÇÃO
let aluno = {}

//IMPORTAÇÃO DA CONEXÃO COM O BD
const con = await connect();

// "aluno.all" = REFERÊNCIA PARA A ROTA
// (req, res) => REQ = REQUISIÇÃO,
//               RES = RESPOSTA (RETORNO)
aluno.all = async function (req, res)
{

    //OBS: recomendado utilizar o try-catch onde não se possui controle sobre a entrada/saída de dados
    try 
    {
        //QUERY SQL
        let alunos = await con.query(`SELECT * FROM aluno;`);

        //MÉTODO QUE DEVOLVE O VALOR PARA QUEM FEZ A REQUISIÇÃO
        res.send(alunos);
    }
    catch (err)
    {
        //EXECUTA SE HOUVER ERRO NA CONSULTA E EXIBE QUAL FOI
        console.log("erro consulta..........", err);
    }
}

export {aluno}